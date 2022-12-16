import React, { memo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import roomApi from '../../apis/roomApi'
import styles from './RoomSecurityModal.module.scss'
import validate from '../../Utils/validate'
import userAction from '../../actions/userAction'

function RoomSecurityModal() {
   const dispatch = useDispatch()
   const { user } = useSelector(state => state.userReducer.userData)
   const curRoom = useSelector(state => state.roomReducer.curRoom)

   const [security, setSecurity] = useState(true)
   const [newPassword, setNewPassword] = useState('')
   const [errors, setErrors] = useState(null)

   const handleOpenModal = value => {
      dispatch(userAction.changeCurModal(value))
   }

   const handleChangeRoomPassword = async () => {
      try {
         await roomApi.changePassword(curRoom._id, {
            userId: user._id,
            password: newPassword,
         })
         handleOpenModal('')
      } catch (err) {
         console.log(err)
      }
   }

   const hanleSubmit = e => {
      e.preventDefault()

      let errorChecks = { newPassword: false }
      if (security) {
         if (!validate.required(newPassword)) {
            errorChecks.newPassword = true
            setErrors(prev => ({ ...prev, newPassword: 'New password is required' }))
         }
         if (!validate.checkErrors(errorChecks)) {
            handleChangeRoomPassword()
            setErrors(null)
         }
      } else {
         handleChangeRoomPassword()
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
                  onFocus={() => setErrors(prev => ({ ...prev, newPassword: '' }))}
               />
            </div>

            {security && (
               <input
                  className={styles.formInput}
                  type='password'
                  placeholder='New Password...'
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  onFocus={() => setErrors(prev => ({ ...prev, newPassword: '' }))}
               />
            )}
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

export default memo(RoomSecurityModal)
