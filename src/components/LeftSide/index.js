import React from 'react'
import LogoSearch from '../LogoSearch'
import Conversations from '../Conversations'
import styles from './LeftSide.module.scss'

function LeftSide() {
   return (
      <div className={styles.leftSide}>
         <LogoSearch />
         <Conversations />
      </div>
   )
}

export default LeftSide
