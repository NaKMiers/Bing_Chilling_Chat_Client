import React, { forwardRef, memo, useEffect, useState } from 'react'
import { format } from 'timeago.js'
import userApi from '../../../apis/userApi'
import styles from './Message.module.scss'

function Message({ message, own }, ref) {
   const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
   const [showTime, setShowTime] = useState(false)
   const [user, setUser] = useState('')
   const [showMenu, setShowMenu] = useState(false)

   useEffect(() => {
      const getUser = async () => {
         try {
            const res = await userApi.getUser(message.senderId)
            setUser(res.data)
         } catch (err) {
            console.log(err)
         }
      }

      getUser()
   }, [message])

   return (
      <div className={`${styles.message} ${own ? styles.own : ''}`} ref={ref}>
         <>
            <img
               style={{ visibility: user ? 'visible' : 'hidden' }}
               src={serverPublic + (user.avatar || 'defaultAvatar.png')}
               alt='avatar'
               // onDoubleClick={() => setShowMenu(true)}
               // onClick={() => setShowMenu(false)}
            />

            {showMenu && (
               <div className={styles.menus}>
                  <div className={styles.menuItem}>Blocks</div>
               </div>
            )}

            <div className={styles.messageContent}>
               <span
                  style={{ background: own ? 'var(--primary)' : 'var(--old)' }}
                  onClick={() => {
                     setShowTime(!showTime)
                  }}
               >
                  {message.text}
               </span>
               {showTime && <span>{format(message.createdAt)}</span>}
            </div>
         </>
      </div>
   )
}

export default memo(forwardRef(Message))
