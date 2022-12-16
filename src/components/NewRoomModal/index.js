import React, { memo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './NewRoomModal.module.scss'
import roomApi from '../../apis/roomApi'
import roomAction from '../../actions/roomAction'
import validate from '../../Utils/validate'
import userAction from '../../actions/userAction'

function NewRoomModal({ socket }) {
   const { user } = useSelector(state => state.userReducer.userData)
   const dispatch = useDispatch()
   const [formData, setFormData] = useState({ title: '', password: '' })
   const [security, setSecurity] = useState(false)
   const [errors, setErrors] = useState(null)

   const handleOpenModal = value => {
      dispatch(userAction.changeCurModal(value))
   }

   const handleChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value })
   }

   const handleCreateNewRoom = async () => {
      const roomData = { ...formData, host: user._id, members: [user._id] }
      dispatch(roomAction.createRoomStart())
      try {
         const res = await roomApi.createRoom(roomData)
         dispatch(roomAction.createRoomSuccess(res.data))

         // add new room in socket.io
         socket.current.emit('user-add-new-room', { userId: user._id, roomId: res.data._id })

         handleOpenModal('')
      } catch (err) {
         console.log(err)
         dispatch(roomAction.createRoomFail())
      }
   }

   const handleSubmit = e => {
      e.preventDefault()
      let errorChecks = { title: false, password: false }
      if (!validate.required(formData.title)) {
         errorChecks.title = true
         setErrors(prev => ({ ...prev, title: 'Title is required' }))
      }
      if (security) {
         if (!validate.required(formData.password)) {
            errorChecks.password = true
            setErrors(prev => ({ ...prev, password: 'Password is required' }))
         }
      }

      if (!validate.checkErrors(errorChecks)) {
         handleCreateNewRoom()
         setErrors(null)
      }
   }

   return (
      <div className={styles.NewRoomModal}>
         <form onSubmit={handleSubmit}>
            <h3>{formData.title || 'Create Room'}</h3>

            <input
               name='title'
               className={styles.formInput}
               type='text'
               placeholder='Title...'
               value={formData.title}
               onChange={handleChange}
               onFocus={() => setErrors(prev => ({ ...prev, title: '' }))}
            />
            {errors?.title && <p className={styles.inputError}>{errors.title}</p>}

            <div className={styles.security}>
               <label htmlFor='security'>Security</label>
               <input
                  id='security'
                  type='checkbox'
                  name='security'
                  onChange={() => setSecurity(!security)}
                  onFocus={() => setErrors(prev => ({ ...prev, password: '' }))}
               />
            </div>

            {security && (
               <>
                  <input
                     name='password'
                     className={styles.formInput}
                     type='password'
                     placeholder='Password...'
                     value={formData.password}
                     onChange={handleChange}
                     onFocus={() => setErrors(prev => ({ ...prev, password: '' }))}
                  />
                  {errors?.password && <p className={styles.inputError}>{errors.password}</p>}
               </>
            )}

            <div className={styles.buttonWrap}>
               <button className={`${styles.saveBtn} button`}>Create</button>
               <button className={`${styles.cancelBtn}`} onClick={() => handleOpenModal('')}>
                  Cancel
               </button>
            </div>
         </form>
      </div>
   )
}

export default memo(NewRoomModal)
