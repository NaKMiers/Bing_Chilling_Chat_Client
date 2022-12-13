import React, { useState } from 'react'
import styles from './Message.module.scss'

function Message({ own }) {
   const [showTime, setShowTime] = useState(false)

   return (
      <div className={`${styles.message} ${own ? styles.own : ''}`}>
         <img className={styles.image} src='https://bom.so/FWOSVO' alt='avatar' />
         <div className={styles.messageContent}>
            <span
               style={{ background: own ? '#888' : 'orangered' }}
               onClick={() => {
                  setShowTime(!showTime)
               }}
            >
               hello hello hello hello
            </span>
            {showTime && <span>1 hour ago</span>}
         </div>
      </div>
   )
}

export default Message
