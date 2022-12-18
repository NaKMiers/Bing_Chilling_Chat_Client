import React from 'react'
import styles from './DevInfoPage.module.scss'
import LogoSearch from '../../components/LogoSearch'
import Navbar from '../../components/Navbar'

function DevInfoPage() {
   return (
      <div className={styles.DevInfoPage}>
         <a href='https://nakmiers.github.io/Portfolio' style={{ textDecoration: 'underline' }}>
            Portfolio
         </a>
      </div>
   )
}

export default DevInfoPage
