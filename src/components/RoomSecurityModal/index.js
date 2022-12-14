import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import roomApi from '../../apis/roomApi'
import styles from './RoomSecurityModal.module.scss'

function RoomSecurityModal({ setSelectedModal }) {
   const { user } = useSelector(state => state.userReducer.userData)
   const curRoom = useSelector(state => state.roomReducer.curRoom)

   const [security, setSecurity] = useState(true)
   const [newPassword, setNewPassword] = useState('')

   const hanleSubmit = async e => {
      e.preventDefault()

      try {
         const res = await roomApi.changePassword(curRoom._id, {
            userId: user._id,
            password: newPassword,
         })
         console.log('res-change-password: ', res)
         setSelectedModal(false)
      } catch (err) {
         console.log(err)
      }
   }

   return (
      <div className={styles.RoomSecurityModal}>
         <form onSubmit={hanleSubmit}>
            <h3>Change Password</h3>

            <div className={styles.security}>
               <label htmlFor='security'>Set No Password</label>
               <input
                  id='security'
                  type='checkbox'
                  name='security'
                  onChange={() => setSecurity(!security)}
               />
            </div>

            {security && (
               <input
                  className={styles.usernameInput}
                  type='password'
                  placeholder='New Password...'
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
               />
            )}

            <div className={styles.buttonWrap}>
               <button className={`${styles.saveBtn} button`}>Save</button>
               <button className={`${styles.cancelBtn}`} onClick={() => setSelectedModal('')}>
                  Cancel
               </button>
            </div>
         </form>
      </div>
   )
}

export default RoomSecurityModal
