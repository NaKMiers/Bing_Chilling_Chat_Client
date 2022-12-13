import React, { useState } from 'react'
import styles from './Security.module.scss'

function Security({ setSelectedModal }) {
   const [password, setPassword] = useState('')
   const [newPassword, setNewPassword] = useState('')

   const hanleSubmit = e => {
      e.preventDefault()
   }

   return (
      <div className={styles.Security}>
         <form onSubmit={hanleSubmit}>
            <h3>Change Password</h3>

            <input
               className={styles.usernameInput}
               type='text'
               placeholder='Password...'
               value={password}
               onChange={e => setPassword(e.target.value)}
            />

            <input
               className={styles.usernameInput}
               type='text'
               placeholder='New Password...'
               value={newPassword}
               onChange={e => setNewPassword(e.target.value)}
            />

            <div className={styles.buttonWrap}>
               <button className={`${styles.saveBtn} button`}>Save</button>
               <button className={`${styles.cancelBtn}`} onClick={() => setSelectedModal('')}>
                  Cancle
               </button>
            </div>
         </form>
      </div>
   )
}

export default Security
