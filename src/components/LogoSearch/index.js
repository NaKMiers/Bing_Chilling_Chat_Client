import { UilSearch } from '@iconscout/react-unicons'
import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import userAction from '../../actions/userAction'
import styles from './LogoSearch.module.scss'

function LogoSearch({ searchValue, setSearchValue }) {
   const dispatch = useDispatch()
   const serverPubcic = process.env.REACT_APP_PUBLIC_FOLDER

   const handleOpenModal = value => {
      dispatch(userAction.changeCurModal(value))
   }

   return (
      <>
         <div className={styles.logoSearch}>
            <img className={styles.logo} src={serverPubcic + 'logo.png'} alt='logo' />
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
                  <img className={styles.logo} src={serverPubcic + 'logo.png'} alt='logo' />
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
