import React, { forwardRef, useEffect, useState } from 'react'
import { format } from 'timeago.js'
import userApi from '../../../apis/userApi'
import styles from './Message.module.scss'

function Message({ message, own }, ref) {
   const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
   const [showTime, setShowTime] = useState(false)
   const [user, setUser] = useState('')

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
               className={styles.image}
               src={serverPublic + (user.avatar || 'defaultAvatar.png')}
               alt='avatar'
            />

            <div className={styles.messageContent}>
               <span
                  style={{ background: own ? '#999' : 'orangered' }}
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

export default forwardRef(Message)
