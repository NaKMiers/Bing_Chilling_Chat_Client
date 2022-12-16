import React, { memo, useEffect, useRef, useState } from 'react'
import { UilPlus } from '@iconscout/react-unicons'
import { UilCheck } from '@iconscout/react-unicons'
import { useDispatch, useSelector } from 'react-redux'
import styles from './EditRoomModal.module.scss'
import avatarData from '../../Data/avatarData'
import uploadApi from '../../apis/uploadApi'
import roomApi from '../../apis/roomApi'
import roomAction from '../../actions/roomAction'
import validate from '../../Utils/validate'
import userAction from '../../actions/userAction'

function EditRoomModal() {
   const dispatch = useDispatch()
   const { user } = useSelector(state => state.userReducer.userData)
   const curRoom = useSelector(state => state.roomReducer.curRoom)
   const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
   const fileRef = useRef(null)
   const [title, setTitle] = useState(curRoom?.title || '')
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
      const imgFile = e.target.files[0]
      const avt = URL.createObjectURL(imgFile)
      console.log(avt)
      setAvatarUploads([imgFile, ...avatarUploads])
      setAvatars(prev => [avt, ...prev])
   }

   const handleEditRoom = async () => {
      const findIndex = value => {
         let index = -1
         avatars.forEach((avt, i) => {
            if (avt === value) {
               index = i
            }
         })

         return index
      }

      const roomData = { title, userId: user._id }
      if (selected.startsWith('blob:')) {
         const data = new FormData()
         const index = findIndex(selected)
         const filename = Date.now() + avatarUploads[index].name
         data.append('name', filename)
         data.append('file', avatarUploads[index])
         roomData.avatar = filename

         try {
            await uploadApi.uploadAvatar(data)
         } catch (err) {
            console.log(err)
         }
      } else {
         roomData.avatar = selected
      }

      dispatch(roomAction.editRoomStart())
      try {
         const res = await roomApi.editRoom(curRoom._id, roomData)
         dispatch(roomAction.editRoomSuccess(res.data))
         dispatch(roomAction.setCurRoom(res.data))
         handleOpenModal('')
      } catch (err) {
         console.log(err)
         dispatch(roomAction.editRoomFail())
      }
   }

   const handleSubmit = async e => {
      e.preventDefault()

      let errorChecks = { title: false }
      if (!validate.required(title)) {
         errorChecks.title = true
         setErrors(prev => ({ ...prev, title: 'Title is required' }))
      }
      if (!validate.checkErrors(errorChecks)) {
         handleEditRoom()
         setErrors(null)
      }
   }

   return (
      <div className={styles.EditRoomModal}>
         <form onSubmit={handleSubmit}>
            <h3>{curRoom.title}</h3>

            {errors?.title && <p className={styles.error}>{errors.title}</p>}

            <input
               name='title'
               className={styles.formInput}
               type='text'
               placeholder='Title...'
               value={title}
               onChange={e => setTitle(e.target.value)}
               onFocus={() => setErrors(prev => ({ ...prev, general: '', title: '' }))}
            />

            <div className={styles.avatars}>
               <div
                  className={`${styles.avatarWrap} ${styles.addImageBtn}`}
                  onClick={() => fileRef.current.click()}
               >
                  <UilPlus />
                  <input
                     type='file'
                     ref={fileRef}
                     style={{ display: 'none' }}
                     onChange={onUploadImage}
                  />
               </div>

               {avatars.map(avt => (
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
               ))}
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

export default memo(EditRoomModal)
