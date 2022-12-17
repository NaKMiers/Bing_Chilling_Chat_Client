import { UilSearch } from '@iconscout/react-unicons'
import React, { memo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import roomAction from '../../actions/roomAction'
import userAction from '../../actions/userAction'
import styles from './LogoSearch.module.scss'

function LogoSearch({ searchValue, setSearchValue }) {
   const dispatch = useDispatch()
   const { user } = useSelector(state => state.userReducer.userData)
   const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
   const [showMenu, setShowMenu] = useState(false)

   const handleOpenModal = value => {
      dispatch(userAction.changeCurModal(value))
   }

   const hanleLogout = () => {
      dispatch(userAction.logout())
      dispatch(roomAction.clearAll())
   }

   return (
      <>
         <div className={styles.logoSearch}>
            <img className={styles.logo} src={serverPublic + 'logo.png'} alt='logo' />
            <div className={styles.inputWrap}>
               <input
                  className={styles.searchInput}
                  type='text'
                  placeholder='Search...'
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value.toLowerCase())}
               />
               <div className={styles.searchBtn}>
                  <UilSearch />
               </div>
            </div>
         </div>

         <div className={styles.logoSearch}>
            <div className={styles.navTop}>
               <div>
                  <img className={styles.logo} src={serverPublic + 'logo.png'} alt='logo' />
                  <span>Rooms</span>
               </div>
               <div>
                  <button
                     className={`${styles.chatBtn} button`}
                     onClick={() => handleOpenModal('new-room')}
                  >
                     New
                  </button>
                  <button
                     className={`${styles.chatBtn} button`}
                     onClick={() => handleOpenModal('join-room')}
                  >
                     Join
                  </button>
                  <img
                     className={styles.image}
                     src={serverPublic + (user?.avatar || 'defaultAvatar.png')}
                     alt='avatar'
                     style={{ cursor: 'pointer' }}
                     onClick={() => setShowMenu(!showMenu)}
                  />
                  {showMenu && (
                     <div className={styles.menus}>
                        {user && (
                           <>
                              <div
                                 className={styles.menuItem}
                                 onClick={() => handleOpenModal('profile')}
                              >
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
            <div className={`${styles.navBottom} ${styles.inputWrap}`}>
               <input
                  className={styles.searchInput}
                  type='text'
                  placeholder='Search...'
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value.toLowerCase())}
               />
               <div className={styles.searchBtn}>
                  <UilSearch />
               </div>
            </div>
         </div>
      </>
   )
}

export default memo(LogoSearch)
