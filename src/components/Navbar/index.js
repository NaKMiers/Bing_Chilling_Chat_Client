import { UilAngleLeftB, UilBars } from '@iconscout/react-unicons'
import React, { memo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userAction from '../../actions/userAction'
import NavMenu from '../NavMenu'
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

            {showMenu && <NavMenu setShowMenu={setShowMenu} />}
         </div>
      </div>
   )
}

export default memo(Navbar)
