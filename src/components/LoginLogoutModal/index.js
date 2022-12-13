import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './LoginLogoutModal.module.scss'

function LoginLogoutModal({ setSelectedModal }) {
   const [isLogin, setLogin] = useState(true)
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')

   const handleSubmit = e => {
      e.preventDefault()
   }

   return isLogin ? (
      <div className={styles.LoginLogoutModal}>
         <form onSubmit={handleSubmit}>
            <h3>Login</h3>

            <input
               className={styles.usernameInput}
               type='text'
               placeholder='Username...'
               value={username}
               onChange={e => setUsername(e.target.value)}
            />

            <input
               className={styles.usernameInput}
               type='text'
               placeholder='Password...'
               value={password}
               onChange={e => setPassword(e.target.value)}
            />

            <p>
               I don't have account. <span onClick={() => setLogin(false)}>Register</span>
            </p>

            <div className={styles.buttonWrap}>
               <button className={`${styles.saveBtn} button`}>Login</button>
               <button className={`${styles.cancelBtn}`} onClick={() => setSelectedModal('')}>
                  Cancle
               </button>
            </div>
         </form>
      </div>
   ) : (
      <div className={styles.LoginLogoutModal}>
         <form onSubmit={handleSubmit}>
            <h3>Register</h3>

            <input
               className={styles.usernameInput}
               type='text'
               placeholder='Username...'
               value={username}
               onChange={e => setUsername(e.target.value)}
            />

            <input
               className={styles.usernameInput}
               type='text'
               placeholder='Password...'
               value={password}
               onChange={e => setPassword(e.target.value)}
            />

            <p>
               I have account. <span onClick={() => setLogin(true)}>Login</span>
            </p>

            <div className={styles.buttonWrap}>
               <button className={`${styles.saveBtn} button`} style={{ width: 80 }}>
                  Register
               </button>
               <button className={`${styles.cancelBtn}`} onClick={() => setSelectedModal('')}>
                  Cancle
               </button>
            </div>
         </form>
      </div>
   )
}

export default LoginLogoutModal
