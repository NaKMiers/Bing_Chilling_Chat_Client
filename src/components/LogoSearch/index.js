import React, { memo } from 'react'
import { UilSearch } from '@iconscout/react-unicons'
import styles from './LogoSearch.module.scss'

function LogoSearch({ searchValue, setSearchValue }) {
   const serverPubcic = process.env.REACT_APP_PUBLIC_FOLDER

   return (
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
   )
}

export default memo(LogoSearch)
