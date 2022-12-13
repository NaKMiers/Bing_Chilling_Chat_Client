import React from 'react'
import ChatBox from '../ChatBox'
import Navbar from '../Navbar'
import styles from './RightSide.module.scss'

function RightSide() {
   return (
      <div className={styles.rightSide}>
         <Navbar />
         <ChatBox />
      </div>
   )
}

export default RightSide
