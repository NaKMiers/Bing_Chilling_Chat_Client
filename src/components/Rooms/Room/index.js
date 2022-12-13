import React from 'react'
import styles from './Room.module.scss'

function Room() {
   return (
      <div className={styles.room}>
         <div className={styles.avatar}>
            <div className={styles.onlineDot}></div>
            <img className={styles.image} src='https://bom.so/FWOSVO' alt='avatar' />
         </div>
         <div className={styles.roomInfo}>
            <span>Nguyen Anh Khoa</span>
            <span>Online</span>
         </div>
      </div>
   )
}

export default Room
