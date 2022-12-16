import React, { memo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userApi from '../../apis/userApi'
import styles from './Security.module.scss'
import validate from '../../Utils/validate'
import userAction from '../../actions/userAction'

function Security() {
   const dispatch = useDispatch()
   const { user } = useSelector(state => state.userReducer.userData)

   const [password, setPassword] = useState('')
   const [newPassword, setNewPassword] = useState('')
   const [errors, setErrors] = useState(null)

   const handleOpenModal = value => {
      dispatch(userAction.changeCurModal(value))
   }

   const hanleSubmit = async e => {
      e.preventDefault()

      let errorChecks = { password: false, newPassword: false }
      if (!validate.required(password)) {
         errorChecks.username = true
         setErrors(prev => ({ ...prev, password: 'Password is required' }))
      }
      if (!validate.required(newPassword)) {
         errorChecks.password = true
         setErrors(prev => ({ ...prev, newPassword: 'New password is required' }))
      }

      if (!validate.checkErrors(errorChecks)) {
         if (!validate.minLength(newPassword, 6)) {
            errorChecks.password = true
            setErrors(prev => ({ ...prev, newPassword: 'New password must be > 5 letters' }))
         }
         if (!validate.checkErrors(errorChecks)) {
            try {
               await userApi.changePassword(user._id, { password, newPassword })
               handleOpenModal('')
               setErrors(null)
            } catch (err) {
               console.log(err)
               setErrors({ general: err.response.data.message })
            }
         }
      }
   }

   return (
      <div className={styles.Security}>
         <form onSubmit={hanleSubmit}>
            <h3>Change Password</h3>

            {errors?.general && <p className={styles.error}>{errors.general}</p>}

            <input
               className={styles.formInput}
               type='password'
               placeholder='Password...'
               value={password}
               onChange={e => setPassword(e.target.value)}
               onFocus={() => setErrors(prev => ({ ...prev, general: '', password: '' }))}
            />
            {errors?.password && <p className={styles.inputError}>{errors.password}</p>}

            <input
               className={styles.formInput}
               type='password'
               placeholder='New Password...'
               value={newPassword}
               onChange={e => setNewPassword(e.target.value)}
               onFocus={() => setErrors(prev => ({ ...prev, general: '', newPassword: '' }))}
            />
            {errors?.newPassword && <p className={styles.inputError}>{errors.newPassword}</p>}

            <div className={styles.buttonWrap}>
               <button className={`${styles.saveBtn} button`}>Save</button>
               <button className={`${styles.cancelBtn}`} onClick={() => handleOpenModal('')}>
                  Cancel
               </button>
            </div>
         </form>
      </div>
   )
}

export default memo(Security)
