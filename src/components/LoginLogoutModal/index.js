import React, { memo, useState } from 'react'
import { useDispatch } from 'react-redux'
import userAction from '../../actions/userAction'
import authApi from '../../apis/authApi'
import styles from './LoginLogoutModal.module.scss'
import validate from '../../Utils/validate'

function LoginLogoutModal() {
   const dispatch = useDispatch()

   const [isLogin, setLogin] = useState(true)
   const [formData, setFormData] = useState({ username: '', password: '' })
   const [errors, setErrors] = useState(null)

   const handleOpenModal = value => {
      dispatch(userAction.changeCurModal(value))
   }

   const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

   const handleLogin = async () => {
      console.log(123123)
      try {
         const res = await authApi.login(formData)
         dispatch(userAction.loginSuccess(res.data))
         handleOpenModal('')
      } catch (err) {
         setErrors({ general: err.response.data.message })
      }
   }

   const handleRegister = async () => {
      try {
         const res = await authApi.register(formData)
         dispatch(userAction.registerSuccess(res.data))
         handleOpenModal('')
      } catch (err) {
         setErrors({ general: err.response.data.message })
      }
   }

   const handleSubmit = e => {
      e.preventDefault()

      let errorChecks = { username: false, password: false }
      if (!validate.required(formData.username)) {
         errorChecks.username = true
         setErrors(prev => ({ ...prev, username: 'Username is required' }))
      }
      if (!validate.required(formData.password)) {
         errorChecks.password = true
         setErrors(prev => ({ ...prev, password: 'Password is required' }))
      }

      if (!validate.checkErrors(errorChecks)) {
         if (isLogin) {
            handleLogin()
            setErrors(null)
         } else {
            if (!validate.minLength(formData.username, 6)) {
               errorChecks.username = true
               setErrors(prev => ({ ...prev, username: 'Username must be > 5 letters' }))
            }
            if (!validate.minLength(formData.password, 6)) {
               errorChecks.password = true
               setErrors(prev => ({ ...prev, password: 'Password must be > 5 letters' }))
            }
            if (!validate.checkErrors(errorChecks)) {
               handleRegister()
               setErrors(null)
            }
         }
      }
   }

   return isLogin ? (
      <div className={styles.LoginLogoutModal}>
         <form onSubmit={handleSubmit}>
            <h3>Login</h3>

            {errors?.general && <p className={styles.error}>{errors.general}</p>}

            <input
               name='username'
               className={styles.formInput}
               type='text'
               placeholder='Username...'
               value={formData.username}
               onChange={handleChange}
               onFocus={() => setErrors(prev => ({ ...prev, general: '', username: '' }))}
            />
            {errors?.username && <p className={styles.inputError}>{errors.username}</p>}

            <input
               name='password'
               className={styles.formInput}
               type='password'
               placeholder='Password...'
               value={formData.password}
               onChange={handleChange}
               onFocus={() => setErrors(prev => ({ ...prev, general: '', password: '' }))}
            />
            {errors?.password && <p className={styles.inputError}>{errors.password}</p>}

            <p style={{ fontSize: 13 }}>
               I don't have account. <span onClick={() => setLogin(false)}>Register</span>
            </p>
            <p style={{ fontSize: 12, alignSelf: 'center' }}>
               <span>Forgot password.</span>
            </p>

            <div className={styles.buttonWrap}>
               <button className={`${styles.saveBtn} button`}>Login</button>
               <button className={`${styles.cancelBtn}`} onClick={() => handleOpenModal('')}>
                  Cancel
               </button>
            </div>
         </form>
      </div>
   ) : (
      <div className={styles.LoginLogoutModal}>
         <form onSubmit={handleSubmit}>
            <h3>Register</h3>

            {errors?.general && <p className={styles.error}>{errors.general}</p>}

            <input
               name='username'
               className={styles.formInput}
               type='text'
               placeholder='Username...'
               value={formData.username}
               onChange={handleChange}
               onFocus={() => setErrors(prev => ({ ...prev, general: '', username: '' }))}
            />
            {errors?.username && <p className={styles.inputError}>{errors.username}</p>}

            <input
               name='password'
               className={styles.formInput}
               type='password'
               placeholder='Password...'
               value={formData.password}
               onChange={handleChange}
               onFocus={() => setErrors(prev => ({ ...prev, general: '', password: '' }))}
            />
            {errors?.password && <p className={styles.inputError}>{errors.password}</p>}

            <p style={{ fontSize: 13 }}>
               I have account. <span onClick={() => setLogin(true)}>Login</span>
            </p>

            <div className={styles.buttonWrap}>
               <button className={`${styles.saveBtn} button`} style={{ width: 80 }}>
                  Register
               </button>
               <button className={`${styles.cancelBtn}`} onClick={() => handleOpenModal('')}>
                  Cancel
               </button>
            </div>
         </form>
      </div>
   )
}

export default memo(LoginLogoutModal)
