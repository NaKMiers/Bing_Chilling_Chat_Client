import React, { useEffect, useRef, useState } from 'react'
import InputEmoji from 'react-input-emoji'
import { useSelector } from 'react-redux'
import messageApi from '../../apis/messageApi'
import styles from './ChatBox.module.scss'
import ChatHeader from './ChatHeader'
import Message from './Message'

function ChatBox({ socket, setSelectedModal, setSendMessage, receivedMessage }) {
   const { user } = useSelector(state => state.userReducer.userData)
   const curRoom = useSelector(state => state.roomReducer.curRoom)
   const scrollRef = useRef()

   const [messages, setMessages] = useState([])
   const [newMessage, setNewMessage] = useState('')

   // Sroll to bottom
   useEffect(() => {
      if (scrollRef.current) {
         scrollRef.current.scrollIntoView({ behavior: 'smooth' })
      }
   }, [messages, curRoom])

   const scrollIntoView = () => {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
   }

   // Get all messages
   useEffect(() => {
      const fetchAllMessage = async () => {
         try {
            const res = await messageApi.getAllMessages(curRoom._id, { userId: user._id })
            setMessages(res.data)
         } catch (err) {
            console.log(err)
         }
      }
      if (curRoom && user) {
         fetchAllMessage()
      }
   }, [curRoom, user])

   useEffect(() => {
      if (receivedMessage !== null && receivedMessage.roomId === curRoom?._id) {
         setMessages(prev => [...prev, receivedMessage])
      }
   }, [receivedMessage, curRoom?._id])

   const handleSendMessage = async () => {
      const message = { senderId: user._id, text: newMessage, roomId: curRoom._id }

      // Send message to socket.io
      const receiverIds = curRoom.members.filter(id => id !== user._id)
      setSendMessage({ ...message, receiverIds })

      // Send message to database
      try {
         const res = await messageApi.createMessage(message)
         console.log('res-send-message: ', res)
         setMessages(prev => [...prev, res.data])
         setNewMessage('')
      } catch (err) {
         console.log(err)
      }
   }

   return (
      <div className={styles.chatbox}>
         {curRoom ? (
            <>
               <ChatHeader setSelectedModal={setSelectedModal} socket={socket} />

               <div className={styles.chatBody}>
                  {messages.map((message, index) => (
                     <Message
                        key={index}
                        message={message}
                        own={message.senderId === user._id}
                        ref={scrollRef}
                     />
                  ))}
               </div>

               <div className={styles.chatSendBox}>
                  <button className={`${styles.plusBtn} button`} onClick={scrollIntoView}>
                     +
                  </button>
                  <InputEmoji value={newMessage} onChange={value => setNewMessage(value)} />
                  <button className={`${styles.sendBtn} button`} onClick={handleSendMessage}>
                     Send
                  </button>
               </div>
            </>
         ) : (
            <p className={styles.emptyCurRoom}>Select room to start chat.</p>
         )}
      </div>
   )
}

export default ChatBox
