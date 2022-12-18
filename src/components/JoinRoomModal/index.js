import React, { memo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import roomAction from '../../actions/roomAction'
import userAction from '../../actions/userAction'
import roomApi from '../../apis/roomApi'
import validate from '../../Utils/validate'
import styles from './JoinRoomModal.module.scss'

function JoinRoomModal({ socket }) {
   const dispatch = useDispatch()
   const { user } = useSelector(state => state.userReducer.userData)

   const [roomId, setRoomId] = useState('')
   const [password, setPassword] = useState('')
   const [security, setSecurity] = useState(true)
   const [errors, setErrors] = useState(null)

   const handleOpenModal = value => {
      dispatch(userAction.changeCurModal(value))
   }

   const handleJoinRoom = async () => {
      // join room in server
      try {
         const res = await roomApi.joinRoom(roomId, { userId: user._id, password })
         dispatch(roomAction.joinRoomSuccess(res.data))

         // join room in socket.io
         // console.log('join room in socket.io: ', { userJoinId: user._id, roomId })
         socket.current.emit('join-room', { userJoinId: user._id, roomId })

         handleOpenModal('')
      } catch (err) {
         console.log(err)
         if (err.response.status === 500) {
            setErrors({ general: 'Room does not exists' })
         } else {
            setErrors({ general: err.response.data.message })
         }
      }
   }

   const handleSubmit = e => {
      e.preventDefault()

      let errorChecks = { roomId: false, password: false }
      if (!validate.required(roomId)) {
         errorChecks.roomId = true
         setErrors(prev => ({ ...prev, roomId: 'Room ID is required' }))
      }
      if (security) {
         if (!validate.required(password)) {
            errorChecks.password = true
            setErrors(prev => ({ ...prev, password: 'Password is required' }))
         }
      }

      if (!validate.checkErrors(errorChecks)) {
         handleJoinRoom()
         setErrors(null)
      }
   }

   return (
      <div className={styles.JoinRoomModal}>
         <form onSubmit={handleSubmit}>
            <h3>Join Room</h3>

            {errors?.general && <p className={styles.error}>{errors.general}</p>}

            <input
               name='roomId'
               className={styles.formInput}
               type='text'
               placeholder='Id...'
               value={roomId}
               onChange={e => setRoomId(e.target.value)}
               onFocus={() => setErrors(prev => ({ ...prev, general: '', roomId: '' }))}
            />
            {errors?.roomId && <p className={styles.inputError}>{errors.roomId}</p>}

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
               <>
                  <input
                     name='password'
                     className={styles.formInput}
                     type='password'
                     placeholder='Password...'
                     value={password}
                     onChange={e => setPassword(e.target.value)}
                     onFocus={() => setErrors(prev => ({ ...prev, general: '', password: '' }))}
                  />
                  {errors?.password && <p className={styles.inputError}>{errors.password}</p>}
               </>
            )}

            <div className={styles.buttonWrap}>
               <button className={`${styles.saveBtn} button`}>Join</button>
               <button className={`${styles.cancelBtn}`} onClick={() => handleOpenModal('')}>
                  Cancel
               </button>
            </div>
         </form>
      </div>
   )
}

export default memo(JoinRoomModal)
