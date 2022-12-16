import React, { memo } from 'react'
import ChatBox from '../ChatBox'
import Navbar from '../Navbar'
import styles from './RightSide.module.scss'

function RightSide({ setSendMessage, receivedMessage, socket, hide, setHide }) {
   return (
      <div className={`${styles.rightSide} ${hide === 'right' ? styles.hide : ''}`}>
         <Navbar setHide={setHide} socket={socket} />
         <ChatBox setSendMessage={setSendMessage} receivedMessage={receivedMessage} socket={socket} />
      </div>
   )
}

export default memo(RightSide)
