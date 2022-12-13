import React, { useState } from 'react'
import { UilPlus } from '@iconscout/react-unicons'
import styles from './ProfileModal.module.scss'
import avatars from '../../Data/avatarData'

function ProfileModal({ setSelectedModal }) {
   const [username, setUsername] = useState('')
   const [selected, setSelected] = useState(-1)

   const hanleSubmit = e => {
      e.preventDefault()
      console.log({ avatar: selected, username })
   }

   return (
      <div className={styles.profileModal}>
         <form onSubmit={hanleSubmit}>
            <input
               className={styles.usernameInput}
               type='text'
               placeholder='Username...'
               value={username}
               onChange={e => setUsername(e.target.value)}
            />

            <div className={styles.avatars}>
               <div className={`${styles.avatarWrap} ${styles.addImageBtn}`}>
                  <UilPlus />
               </div>

               {avatars.map((avt, index) => (
                  <div
                     key={avt}
                     className={`${styles.avatarWrap} ${
                        selected === index ? styles.selectedAvt : ''
                     }`}
                     onClick={() => setSelected(index)}
                  >
                     <img className={styles.avt} src={avt} alt='avt' />
                  </div>
               ))}
            </div>

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

export default ProfileModal
