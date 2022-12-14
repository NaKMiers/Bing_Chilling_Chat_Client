import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import userAction from '../../actions/userAction'
import authApi from '../../apis/authApi'
import styles from './LoginLogoutModal.module.scss'

function LoginLogoutModal({ setSelectedModal }) {
   const dispatch = useDispatch()

   const [isLogin, setLogin] = useState(true)
   const [formData, setFormData] = useState({ username: '', password: '' })

   const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

   const handleSubmit = async e => {
      e.preventDefault()

      if (isLogin) {
         dispatch(userAction.loginStart())
         try {
            const res = await authApi.login(formData)
            console.log('res-login:', res)
            dispatch(userAction.loginSuccess(res.data))
            setSelectedModal(false)
         } catch (err) {
            dispatch(userAction.loginFail())
            console.log(err)
         }
      } else {
         dispatch(userAction.registerStart())
         try {
            const res = await authApi.register(formData)
            console.log('res-register:', res)
            dispatch(userAction.registerSuccess(res.data))
            setSelectedModal(false)
         } catch (err) {
            console.log(err)
            dispatch(userAction.registerFail())
         }
      }
   }

   return isLogin ? (
      <div className={styles.LoginLogoutModal}>
         <form onSubmit={handleSubmit}>
            <h3>Login</h3>

            <input
               name='username'
               className={styles.usernameInput}
               type='text'
               placeholder='Username...'
               value={formData.username}
               onChange={handleChange}
            />

            <input
               name='password'
               className={styles.usernameInput}
               type='password'
               placeholder='Password...'
               value={formData.password}
               onChange={handleChange}
            />

            <p style={{ fontSize: 13 }}>
               I don't have account. <span onClick={() => setLogin(false)}>Register</span>
            </p>

            <div className={styles.buttonWrap}>
               <button className={`${styles.saveBtn} button`}>Login</button>
               <button className={`${styles.cancelBtn}`} onClick={() => setSelectedModal('')}>
                  Cancel
               </button>
            </div>
         </form>
      </div>
   ) : (
      <div className={styles.LoginLogoutModal}>
         <form onSubmit={handleSubmit}>
            <h3>Register</h3>

            <input
               name='username'
               className={styles.usernameInput}
               type='text'
               placeholder='Username...'
               value={formData.username}
               onChange={handleChange}
            />

            <input
               name='password'
               className={styles.usernameInput}
               type='password'
               placeholder='Password...'
               value={formData.password}
               onChange={handleChange}
            />

            <p style={{ fontSize: 13 }}>
               I have account. <span onClick={() => setLogin(true)}>Login</span>
            </p>

            <div className={styles.buttonWrap}>
               <button className={`${styles.saveBtn} button`} style={{ width: 80 }}>
                  Register
               </button>
               <button className={`${styles.cancelBtn}`} onClick={() => setSelectedModal('')}>
                  Cancel
               </button>
            </div>
         </form>
      </div>
   )
}

export default LoginLogoutModal
