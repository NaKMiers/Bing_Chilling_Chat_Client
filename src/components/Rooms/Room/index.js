import React, { memo } from 'react'
import styles from './Room.module.scss'

function Room({ room }) {
   const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

   return (
      <div className={styles.room}>
         <div className={styles.avatar}>
            <div className={styles.onlineDot}></div>
            <img
               className={styles.image}
               src={serverPublic + (room.avatar || 'defaultGroupAvatar.png')}
               alt='avatar'
            />
         </div>
         <div className={styles.roomInfo}>
            <span>{room.title}</span>
            <span>Online</span>
         </div>
      </div>
   )
}

export default memo(Room)
