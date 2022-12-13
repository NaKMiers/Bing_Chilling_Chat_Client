import React, { useState } from 'react'
import styles from './NewRoomModal.module.scss'

function JoinRoomModal({ setSelectedModal }) {
   const [password, setPassword] = useState('')

   const handleSubmit = e => {
      e.preventDefault()
   }

   return (
      <div className={styles.JoinRoomModal}>
         <form onSubmit={handleSubmit}>
            <h3>Title...</h3>

            <input
               name='password'
               className={styles.usernameInput}
               type='text'
               placeholder='Password...'
               value={password}
               onChange={e => setPassword(e.target.value)}
            />

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
