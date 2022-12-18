import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import roomAction from '../../actions/roomAction'
import userAction from '../../actions/userAction'
import styles from './NavMenu.module.scss'

function NavMenu({ setShowMenu }) {
   const dispatch = useDispatch()
   const { user } = useSelector(state => state.userReducer.userData)
   const handleOpenModal = value => {
      setShowMenu(false)
      dispatch(userAction.changeCurModal(value))
   }
   const hanleLogout = () => {
      dispatch(userAction.logout())
      dispatch(roomAction.clearAll())
   }
   return (
      <div className={styles.menus}>
         {user && (
            <>
               <div className={styles.menuItem} onClick={() => handleOpenModal('profile')}>
                  Profile
               </div>
               <div className={styles.menuItem} onClick={() => handleOpenModal('change-password')}>
                  Security
               </div>
               <div className={styles.menuItem}>More</div>
               <div className={styles.menuItem}>
                  <Link to='/dev-info'>Dev Info</Link>
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
   )
}

export default NavMenu
