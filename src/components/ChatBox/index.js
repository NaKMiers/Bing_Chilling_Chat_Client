import React, { memo, useEffect, useRef, useState } from 'react'
import { UilImagePlus, UilTimes, UilTrashAlt } from '@iconscout/react-unicons'
import InputEmoji from 'react-input-emoji'
import { useSelector } from 'react-redux'
import messageApi from '../../apis/messageApi'
import styles from './ChatBox.module.scss'
import ChatHeader from './ChatHeader'
import Message from './Message'

function ChatBox({ socket, setSendMessage, receivedMessage }) {
   const { user } = useSelector(state => state.userReducer.userData)
   const curRoom = useSelector(state => state.roomReducer.curRoom)
   const scrollRef = useRef()
   const fileRef = useRef()

   const [messages, setMessages] = useState([])
   const [newMessage, setNewMessage] = useState('')
   const [showAddMenu, setShowAddMenu] = useState(false)
   const [showPreviewBox, setShowPreviewBox] = useState(false)

   const [images, setImages] = useState([])
   const [imagePreviews, setImagePreviews] = useState([])

   console.log(images)
   console.log(imagePreviews)

   // Sroll to bottom
   useEffect(() => {
      if (scrollRef.current) {
         scrollRef.current.scrollIntoView({ behavior: 'smooth' })
      }
   }, [messages, curRoom])

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

   const onUploadImage = e => {
      const files = e.target.files
      let max = files.length <= 6 ? files.length : 6
      if (files.length > 6) {
         alert('Only 6 files are accepted')
      }

      const imageList = []
      const imagePreviewList = []
      for (let i = 0; i < max; i++) {
         imageList.push(files[i])
         imagePreviewList.push(URL.createObjectURL(files[i]))
      }
      setImagePreviews(imagePreviewList)
      setImages(imageList)
   }

   const handleSendMessage = async () => {
      const message = { senderId: user._id, text: newMessage, roomId: curRoom._id }

      // Send message to socket.io
      const receiverIds = curRoom.members.filter(id => id !== user._id)
      console.log('receiverIds: ', receiverIds)
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
      <div className={`${styles.chatbox} ${imagePreviews.length ? styles.chatBoxResize : ''}`}>
         {curRoom ? (
            <>
               <ChatHeader socket={socket} />

               <div
                  className={`${styles.chatBody} ${imagePreviews.length ? styles.chatBodyResize : ''}`}
               >
                  {messages.length === 0 && <p className={styles.messageEmpty}>Message is empty.</p>}
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
                  <div style={{ display: imagePreviews.length ? 'flex' : 'none' }}>
                     {imagePreviews.map(image => (
                        <div
                           key={image}
                           className={styles.imagePreview}
                           style={{ backgroundImage: `url(${image})` }}
                        >
                           <div
                              onClick={() => setImagePreviews(prev => prev.filter(img => img !== image))}
                           >
                              <UilTimes />
                           </div>
                        </div>
                     ))}
                     <div className={`${styles.clearAllIcon} icon`} onClick={() => setImagePreviews([])}>
                        <UilTrashAlt />
                     </div>
                  </div>
                  <div>
                     <input
                        style={{ display: 'none' }}
                        type='file'
                        ref={fileRef}
                        multiple
                        onChange={onUploadImage}
                     />
                     <button
                        className={`${styles.plusBtn} button`}
                        onClick={() => setShowAddMenu(!showAddMenu)}
                     >
                        +
                     </button>
                     {showAddMenu && (
                        <div className={styles.menus}>
                           <div
                              className={styles.menuItem}
                              onClick={() => {
                                 setShowAddMenu(false)
                                 fileRef.current.click()
                              }}
                           >
                              <UilImagePlus />
                              Image
                           </div>
                           <div className={styles.menuItem}>
                              <UilImagePlus />
                              Close
                           </div>
                        </div>
                     )}

                     <InputEmoji value={newMessage} onChange={value => setNewMessage(value)} />
                     <button className={`${styles.sendBtn} button`} onClick={handleSendMessage}>
                        Send
                     </button>
                  </div>
               </div>
            </>
         ) : (
            <p className={styles.emptyCurRoom}>Select room to start chat.</p>
         )}
      </div>
   )
}

export default memo(ChatBox)
