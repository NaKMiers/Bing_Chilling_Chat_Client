import React from 'react'
import styles from './Conversation.module.scss'

function Conversation() {
   return (
      <div className={styles.conversation}>
         <div className={styles.avatar}>
            <div className={styles.onlineDot}></div>
            <img className={styles.image} src='https://bom.so/FWOSVO' alt='avatar' />
         </div>
         <div className={styles.conversationInfo}>
            <span>Nguyen Anh Khoa</span>
            <span>Online</span>
         </div>
      </div>
   )
}

export default Conversation
