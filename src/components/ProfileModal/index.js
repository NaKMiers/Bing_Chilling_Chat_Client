import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { UilPlus } from '@iconscout/react-unicons'
import { UilCheck } from '@iconscout/react-unicons'
import { useDispatch, useSelector } from 'react-redux'
import styles from './ProfileModal.module.scss'
import avatarData from '../../Data/avatarData'
import uploadApi from '../../apis/uploadApi'
import userApi from '../../apis/userApi'
import userAction from '../../actions/userAction'
import validate from '../../Utils/validate'

function ProfileModal() {
   const dispatch = useDispatch()
   const { user } = useSelector(state => state.userReducer.userData)
   const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
   const fileRef = useRef(null)
   const [username, setUsername] = useState(user?.username || '')
   const [selected, setSelected] = useState('')
   const [avatars, setAvatars] = useState(avatarData)
   const [avatarUploads, setAvatarUploads] = useState([])
   const [errors, setErrors] = useState(null)

   useEffect(
      () => () => {
         avatars.forEach(avt => {
            if (avt.startsWith('blob:')) {
               URL.revokeObjectURL(avt)
            }
         })
      },
      [avatars]
   )

   const handleOpenModal = value => {
      dispatch(userAction.changeCurModal(value))
   }

   const onUploadImage = e => {
      const file = e.target.files[0]
      if (file) {
         if (!file.type.startsWith('image')) {
            setErrors(prev => ({ ...prev, file: 'File upload must be an image' }))
         } else if (file.size > 1048576) {
            setErrors(prev => ({ ...prev, file: 'Maximum file size is 1 mb' }))
         } else {
            const avt = URL.createObjectURL(file)
            setAvatarUploads([file, ...avatarUploads])
            setAvatars(prev => [avt, ...prev])
         }
      }
   }

   const handleEditProfile = async () => {
      const findIndex = value => {
         let index = -1
         avatars.forEach((avt, i) => {
            if (avt === value) {
               index = i
            }
         })

         return index
      }

      const userData = { username }
      if (selected.startsWith('blob:')) {
         const data = new FormData()
         const index = findIndex(selected)
         const filename = Date.now() + avatarUploads[index].name
         data.append('name', filename)
         data.append('file', avatarUploads[index])
         userData.avatar = filename

         try {
            await uploadApi.uploadAvatar(data)
         } catch (err) {
            console.log(err)
         }
      } else {
         userData.avatar = selected
      }

      try {
         const res = await userApi.editProfile(user._id, userData)
         dispatch(userAction.editProfile(res.data))
         handleOpenModal('')
         setErrors(null)
      } catch (err) {
         console.log(err)
      }
   }

   const handleSubmit = e => {
      e.preventDefault()

      let errorChecks = { username: false }
      if (!validate.required(username)) {
         errorChecks.username = true
         setErrors(prev => ({ ...prev, username: 'Username is required' }))
      }
      if (!validate.checkErrors(errorChecks)) {
         if (!validate.minLength(username, 6)) {
            errorChecks.username = true
            setErrors(prev => ({ ...prev, username: 'Username must be > 5 letters' }))
         }
         if (!validate.checkErrors(errorChecks)) {
            handleEditProfile()
         }
      }
   }

   const renderAvatar = useCallback(
      () =>
         avatars.map(avt => (
            <div
               key={avt}
               className={styles.avatarWrap}
               onClick={() => setSelected(avt !== selected ? avt : '')}
            >
               {avt === selected && (
                  <div className={styles.checkIcon}>
                     <UilCheck />
                  </div>
               )}
               <img
                  className={`${styles.avt} ${avt === selected ? styles.selectedAvt : ''}`}
                  src={avt.startsWith('blob:') ? avt : serverPublic + avt}
                  alt='avt'
               />
            </div>
         )),
      [avatars, selected, serverPublic]
   )

   return (
      <div className={styles.profileModal}>
         <form onSubmit={handleSubmit}>
            <h3>Profile</h3>

            {errors?.username && <p className={styles.error}>{errors.username}</p>}

            <input
               className={styles.formInput}
               type='text'
               placeholder='Username...'
               value={username}
               onChange={e => setUsername(e.target.value)}
               onFocus={() => setErrors(prev => ({ ...prev, username: '' }))}
            />

            <div className={styles.avatarsWrap}>
               {errors?.file && <p className={styles.error}>{errors.file}</p>}
               <div className={styles.avatars}>
                  <div
                     className={`${styles.avatarWrap} ${styles.addImageBtn}`}
                     onClick={() => {
                        fileRef.current.click()
                        setErrors(null)
                     }}
                  >
                     <UilPlus />
                     <input
                        style={{ display: 'none' }}
                        type='file'
                        ref={fileRef}
                        onChange={onUploadImage}
                     />
                  </div>

                  {renderAvatar()}
               </div>
            </div>

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

export default memo(ProfileModal)
