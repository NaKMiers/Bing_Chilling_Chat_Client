import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import roomAction from '../../actions/roomAction'
import roomApi from '../../apis/roomApi'
import styles from './JoinRoomModal.module.scss'

function JoinRoomModal({ socket, setSelectedModal }) {
   const dispatch = useDispatch()
   const { user } = useSelector(state => state.userReducer.userData)

   const [roomId, setRoomId] = useState('')
   const [password, setPassword] = useState('')
   const [security, setSecurity] = useState(true)

   const handleSubmit = async e => {
      e.preventDefault()

      // join room in server
      dispatch(roomAction.joinRoomStart())
      try {
         const res = await roomApi.joinRoom(roomId, { userId: user._id, password })
         dispatch(roomAction.joinRoomSuccess(res.data))

         // join room in socket.io
         console.log('join room in socket.io')
         socket.current.emit('join-room', { userJoinId: user._id, roomId })

         setSelectedModal(false)
      } catch (err) {
         dispatch(roomAction.joinRoomFail())
      }
   }

   return (
      <div className={styles.JoinRoomModal}>
         <form onSubmit={handleSubmit}>
            <h3>Join Room</h3>

            <input
               name='roomId'
               className={styles.usernameInput}
               type='text'
               placeholder='Id...'
               value={roomId}
               onChange={e => setRoomId(e.target.value)}
            />

            <div className={styles.security}>
               <label htmlFor='security'>No Password</label>
               <input
                  id='security'
                  type='checkbox'
                  name='security'
                  onChange={() => setSecurity(!security)}
               />
            </div>

            {security && (
               <input
                  name='password'
                  className={styles.usernameInput}
                  type='password'
                  placeholder='Password...'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
               />
            )}

            <div className={styles.buttonWrap}>
               <button className={`${styles.saveBtn} button`}>Join</button>
               <button className={`${styles.cancelBtn}`} onClick={() => setSelectedModal('')}>
                  Cancel
               </button>
            </div>
         </form>
      </div>
   )
}

export default JoinRoomModal
