import React from 'react'
import { UilSearch } from '@iconscout/react-unicons'
import styles from './LogoSearch.module.scss'

function LogoSearch() {
   return (
      <div className={styles.logoSearch}>
         <img className={styles.logo} src='https://bom.so/FWOSVO' alt='logo' />
         <div className={styles.inputWrap}>
            <input className={styles.searchInput} type='text' placeholder='Search...' />
            <div className={styles.searchBtn}>
               <UilSearch />
            </div>
         </div>
      </div>
   )
}

export default LogoSearch
