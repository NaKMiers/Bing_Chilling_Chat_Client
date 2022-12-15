import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './NewRoomModal.module.scss'
import roomApi from '../../apis/roomApi'
import roomAction from '../../actions/roomAction'

function NewRoomModal({ setSelectedModal }) {
   const { user } = useSelector(state => state.userReducer.userData)
   const dispatch = useDispatch()
   const [formData, setFormData] = useState({ title: '', password: '' })
   const [security, setSecurity] = useState(false)

   const handleChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value })
   }

   const handleSubmit = async e => {
      e.preventDefault()
      const roomData = { ...formData, host: user._id, members: [user._id] }
      dispatch(roomAction.createRoomStart())
      try {
         const res = await roomApi.createRoom(roomData)
         dispatch(roomAction.createRoomSuccess(res.data))
         setSelectedModal(false)
      } catch (err) {
         console.log(err)
         dispatch(roomAction.createRoomFail())
      }
   }

   return (
      <div className={styles.NewRoomModal}>
         <form onSubmit={handleSubmit}>
            <h3>{formData.title || 'Create Room'}</h3>

            <input
               name='title'
               className={styles.usernameInput}
               type='text'
               placeholder='Title...'
               value={formData.title}
               onChange={handleChange}
            />

            <div className={styles.security}>
               <label htmlFor='security'>Security</label>
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
                  value={formData.password}
                  onChange={handleChange}
               />
            )}

            <div className={styles.buttonWrap}>
               <button className={`${styles.saveBtn} button`}>Create</button>
               <button className={`${styles.cancelBtn}`} onClick={() => setSelectedModal('')}>
                  Cancel
               </button>
            </div>
         </form>
      </div>
   )
}

export default NewRoomModal
