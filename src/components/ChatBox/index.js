import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UilEllipsisV } from '@iconscout/react-unicons'
import { UilCheck } from '@iconscout/react-unicons'
import { UilCopy } from '@iconscout/react-unicons'
import InputEmoji from 'react-input-emoji'
import styles from './ChatBox.module.scss'
import Message from './Message'
import ChatHeader from './ChatHeader'

function ChatBox({ setSelectedModal }) {
   const dispatch = useDispatch()
   const { user } = useSelector(state => state.userReducer.userData)
   const curRoom = useSelector(state => state.roomReducer.curRoom)
   const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

   return (
      <div className={styles.chatbox}>
         {curRoom ? (
            <>
               <ChatHeader setSelectedModal={setSelectedModal} />

               <div className={styles.chatBody}>
                  <Message own />
                  <Message />
               </div>

               <div className={styles.chatSendBox}>
                  <button className={`${styles.plusBtn} button`}>+</button>
                  <InputEmoji value={''} onChange={() => {}} />
                  <button className={`${styles.sendBtn} button`}>Send</button>
               </div>
            </>
         ) : (
            <p className={styles.emptyCurRoom}>Select room to start chat.</p>
         )}
      </div>
   )
}

export default ChatBox
