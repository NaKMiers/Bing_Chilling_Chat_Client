import React from 'react'
import ChatBox from '../ChatBox'
import Navbar from '../Navbar'
import styles from './RightSide.module.scss'

function RightSide({ setSelectedModal, setSendMessage, receivedMessage, socket }) {
   return (
      <div className={styles.rightSide}>
         <Navbar socket={socket} setSelectedModal={setSelectedModal} />
         <ChatBox
            setSelectedModal={setSelectedModal}
            setSendMessage={setSendMessage}
            receivedMessage={receivedMessage}
            socket={socket}
         />
      </div>
   )
}

export default RightSide
