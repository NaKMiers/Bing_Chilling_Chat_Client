import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import userApi from '../../apis/userApi'
import styles from './Security.module.scss'

function Security({ setSelectedModal }) {
   const { user } = useSelector(state => state.userReducer.userData)

   const [password, setPassword] = useState('')
   const [newPassword, setNewPassword] = useState('')

   const hanleSubmit = async e => {
      e.preventDefault()

      try {
         const res = await userApi.changePassword(user._id, { password, newPassword })
         console.log('res-change-password: ', res)
      } catch (err) {
         console.log(err)
      }
   }

   return (
      <div className={styles.Security}>
         <form onSubmit={hanleSubmit}>
            <h3>Change Password</h3>

            <input
               className={styles.usernameInput}
               type='password'
               placeholder='Password...'
               value={password}
               onChange={e => setPassword(e.target.value)}
            />

            <input
               className={styles.usernameInput}
               type='password'
               placeholder='New Password...'
               value={newPassword}
               onChange={e => setNewPassword(e.target.value)}
            />

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

export default Security
