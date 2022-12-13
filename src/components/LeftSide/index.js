import React from 'react'
import LogoSearch from '../LogoSearch'
import Rooms from '../Rooms'
import styles from './LeftSide.module.scss'

function LeftSide() {
   return (
      <div className={styles.leftSide}>
         <LogoSearch />
         <Rooms />
      </div>
   )
}

export default LeftSide
