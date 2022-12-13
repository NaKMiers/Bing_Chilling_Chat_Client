import { UilEllipsisV } from '@iconscout/react-unicons'
import React from 'react'
import InputEmoji from 'react-input-emoji'
import styles from './ChatBox.module.scss'
import Message from './Message'

function ChatBox() {
   return (
      <div className={styles.chatbox}>
         <div className={styles.chatHeader}>
            <div className={styles.curChat}>
               <div className={styles.avatar}>
                  <div className={styles.onlineDot}></div>
                  <img className={styles.image} src='https://bom.so/FWOSVO' alt='avatar' />
               </div>
               <div className={styles.conversationInfo}>
                  <span>Nguyen Anh Khoa</span>
                  <span>Online</span>
               </div>
            </div>

            <div>
               <UilEllipsisV />
            </div>
         </div>

         <div className={styles.chatBody}>
            <Message own />
            <Message />
         </div>

         <div className={styles.chatSendBox}>
            <button className={`${styles.plusBtn} button`}>+</button>
            <InputEmoji value={''} onChange={() => {}} />
            <button className={`${styles.sendBtn} button`}>Send</button>
         </div>
      </div>
   )
}

export default ChatBox
