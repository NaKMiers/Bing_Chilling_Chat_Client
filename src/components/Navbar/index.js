import React, { memo, useState } from 'react'
import { UilAngleLeftB, UilBars } from '@iconscout/react-unicons'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import roomAction from '../../actions/roomAction'
import userAction from '../../actions/userAction'
import styles from './Navbar.module.scss'

function Navbar({ setHide }) {
   const dispatch = useDispatch()
   const { user } = useSelector(state => state.userReducer.userData)
   const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

   const [showMenu, setShowMenu] = useState(false)

   const handleOpenModal = value => {
      setShowMenu(false)
      dispatch(userAction.changeCurModal(value))
   }

   const hanleLogout = () => {
      dispatch(userAction.logout())
      dispatch(roomAction.clearAll())
   }

   return (
      <div className={styles.navbar}>
         <div className={styles.navLeft}>
            <button className={`${styles.chatBtn} button`} onClick={() => handleOpenModal('new-room')}>
               New
            </button>
            <button className={`${styles.chatBtn} button`} onClick={() => handleOpenModal('join-room')}>
               Join
            </button>
            <div className={`${styles.navIcon} icon`} onClick={() => setShowMenu(!showMenu)}>
               <UilBars />
            </div>
         </div>
         <div className={styles.navRight}>
            <div className={`${styles.navIcon} icon`} onClick={() => setHide('right')}>
               <UilAngleLeftB />
            </div>

            {user && (
               <img
                  className={styles.image}
                  src={serverPublic + (user.avatar || 'defaultAvatar.png')}
                  alt='avatar'
               />
            )}
            <span>{user?.username}</span>

            <div className={`${styles.navIcon} icon`} onClick={() => setShowMenu(!showMenu)}>
               <UilBars />
            </div>

            {showMenu && (
               <div className={styles.menus}>
                  {user && (
                     <>
                        <div className={styles.menuItem} onClick={() => handleOpenModal('profile')}>
                           Profile
                        </div>
                        <div className={styles.menuItem}>
                           <Link to='/setting'>Setting</Link>
                        </div>
                        <div
                           className={styles.menuItem}
                           onClick={() => handleOpenModal('change-password')}
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
                     <div className={styles.menuItem} onClick={() => handleOpenModal('login')}>
                        Login
                     </div>
                  )}
               </div>
            )}
         </div>
      </div>
   )
}

export default memo(Navbar)
