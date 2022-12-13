import { UilBars } from '@iconscout/react-unicons'
import React, { useState } from 'react'
import ProfileModal from '../ProfileModal'
import ChangePasswordModal from '../ChangePasswordModal'
import styles from './Navbar.module.scss'
import { useSelector } from 'react-redux'

function Navbar() {
   const user = useSelector(state => state.userReducer.userData)
   console.log(user)

   const [showMenu, setShowMenu] = useState(false)
   const [selectedModal, setSelectedModal] = useState('')

   const renderModal = () => {
      switch (selectedModal) {
         case 'profile':
            return <ProfileModal setSelectedModal={setSelectedModal} />

         case 'change-password':
            return <ChangePasswordModal setSelectedModal={setSelectedModal} />
         default:
            return
      }
   }

   return (
      <div className={styles.navbar}>
         <button className={`${styles.newChatBtn} button`}>New</button>
         <div className={styles.navRight}>
            <img className={styles.image} src='https://bom.so/FWOSVO' alt='avatar' />
            <span>nakmiers</span>

            <div onClick={() => setShowMenu(!showMenu)} style={{ cursor: 'pointer' }}>
               <UilBars />
            </div>

            {showMenu && (
               <div className={styles.menus}>
                  <div className={styles.menuItem} onClick={() => setSelectedModal('profile')}>
                     Profile
                  </div>
                  <div
                     className={styles.menuItem}
                     onClick={() => setSelectedModal('change-password')}
                  >
                     Security
                  </div>
                  <div className={styles.menuItem} onClick={() => setSelectedModal('Logout')}>
                     Logout
                  </div>
               </div>
            )}
         </div>
         {renderModal()}
      </div>
   )
}

export default Navbar
