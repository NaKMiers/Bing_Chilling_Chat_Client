import React, { memo, useState } from 'react'
import { UilSearch } from '@iconscout/react-unicons'
import { useDispatch, useSelector } from 'react-redux'
import userAction from '../../actions/userAction'
import NavMenu from '../NavMenu'
import styles from './LogoSearch.module.scss'

function LogoSearch({ searchValue, setSearchValue }) {
   const dispatch = useDispatch()
   const { user } = useSelector(state => state.userReducer.userData)
   const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
   const [showMenu, setShowMenu] = useState(false)

   const handleOpenModal = value => {
      dispatch(userAction.changeCurModal(value))
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
                  {showMenu && <NavMenu setShowMenu={setShowMenu} />}
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
