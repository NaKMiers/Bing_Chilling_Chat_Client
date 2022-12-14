import React from 'react'
import ChatBox from '../ChatBox'
import Navbar from '../Navbar'
import styles from './RightSide.module.scss'

function RightSide({ setSelectedModal }) {
   return (
      <div className={styles.rightSide}>
         <Navbar setSelectedModal={setSelectedModal} />
         <ChatBox setSelectedModal={setSelectedModal} />
      </div>
   )
}

export default RightSide
