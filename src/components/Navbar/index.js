import { UilBars } from '@iconscout/react-unicons'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userAction from '../../actions/userAction'
import styles from './Navbar.module.scss'

function Navbar({ setSelectedModal }) {
   const dispatch = useDispatch()
   const { user } = useSelector(state => state.userReducer.userData)

   const [showMenu, setShowMenu] = useState(false)

   const handleShowMenu = value => {
      setSelectedModal(value)
      setShowMenu(false)
   }

   const hanleLogout = () => {
      dispatch(userAction.logout())
   }

   return (
      <div className={styles.navbar}>
         <div className={styles.navLeft}>
            <button
               className={`${styles.newChatBtn} button`}
               onClick={() => setSelectedModal('new-room')}
            >
               New
            </button>
            <button
               className={`${styles.newChatBtn} button`}
               onClick={() => setSelectedModal('join-room')}
            >
               Join
            </button>
         </div>
         <div className={styles.navRight}>
            <img className={styles.image} src='https://bom.so/FWOSVO' alt='avatar' />
            <span>nakmiers</span>

            <div onClick={() => setShowMenu(!showMenu)} style={{ cursor: 'pointer' }}>
               <UilBars />
            </div>

            {showMenu && (
               <div className={styles.menus}>
                  {user && (
                     <>
                        <div className={styles.menuItem} onClick={() => handleShowMenu('profile')}>
                           Profile
                        </div>
                        <div
                           className={styles.menuItem}
                           onClick={() => handleShowMenu('change-password')}
                        >
                           Security
                        </div>
                     </>
                  )}
                  {user ? (
                     <div className={styles.menuItem} onClick={hanleLogout}>
                        Logout
                     </div>
                  ) : (
                     <div className={styles.menuItem} onClick={() => handleShowMenu('login')}>
                        Login
                     </div>
                  )}
               </div>
            )}
         </div>
      </div>
   )
}

export default Navbar
