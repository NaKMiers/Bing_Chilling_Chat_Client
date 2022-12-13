import React from 'react'
import LeftSide from '../../components/LeftSide'
import RightSide from '../../components/RightSide'
import styles from './HomePage.module.scss'

function HomePage() {
   return (
      <div className={styles.homePage}>
         <LeftSide />
         <RightSide />
      </div>
   )
}

export default HomePage
