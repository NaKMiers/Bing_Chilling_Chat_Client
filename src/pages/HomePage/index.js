import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import roomAction from '../../actions/roomAction'
import roomApi from '../../apis/roomApi'
import EditRoomModal from '../../components/EditRoomModal'
import JoinRoomModal from '../../components/JoinRoomModal'
import LeftSide from '../../components/LeftSide'
import LoginLogoutModal from '../../components/LoginLogoutModal'
import NewRoomModal from '../../components/NewRoomModal'
import ProfileModal from '../../components/ProfileModal'
import RightSide from '../../components/RightSide'
import RoomSecurityModal from '../../components/RoomSecurityModal'
import SecurityModal from '../../components/SecurityModal'
import styles from './HomePage.module.scss'
import { io } from 'socket.io-client'

function HomePage() {
   const dispatch = useDispatch()
   const { user } = useSelector(state => state.userReducer.userData)
   const roomData = useSelector(state => state.roomReducer.roomData)
   const curRoom = useSelector(state => state.roomReducer.curRoom)
   const [selectedModal, setSelectedModal] = useState('')
   const socket = useRef()

   console.log('roomData-homePage: ', roomData)

   const [sendMessage, setSendMessage] = useState(null)
   const [receivedMessage, setReceivedMessage] = useState(null)

   // Connect to socket.io
   useEffect(() => {
      socket.current = io('http://localhost:3002')
      socket.current.emit('new-user-add', {
         newUserId: user?._id,
         rooms: roomData.map(room => room._id),
      })
   }, [user?._id, roomData])

   // Send message to socket.io
   useEffect(() => {
      if (sendMessage !== null) {
         socket.current.emit('send-message', sendMessage)
      }
   }, [sendMessage])

   // Receive message from socket.io
   useEffect(() => {
      socket.current.on('receive-message', data => {
         console.log('data received-message', data)
         setReceivedMessage(data)
      })
   }, [])

   // When user JOIN room from socket.io
   useEffect(() => {
      socket.current.on('join-room', data => {
         dispatch(roomAction.anotherUserJoinRoom({ ...data, curRoomId: curRoom._id }))
      })
   }, [curRoom?._id, dispatch])

   // When user LEAVE room from socket.io
   useEffect(() => {
      socket.current.on('leave-room', data => {
         dispatch(roomAction.anotherUserLeaveRoom({ ...data, curRoomId: curRoom._id }))
      })
   }, [curRoom?._id, dispatch])

   // Get all rooms
   useEffect(() => {
      const fetchAllRooms = async () => {
         dispatch(roomAction.getAllRoomsStart())
         try {
            const res = await roomApi.getAllRooms(user?._id)
            dispatch(roomAction.getAllRoomsSuccess(res.data))
         } catch (err) {
            dispatch(roomAction.getAllRoomsFail())
            console.log(err)
         }
      }
      if (user) {
         fetchAllRooms()
      }
   }, [user, dispatch])

   const renderModals = () => {
      switch (selectedModal) {
         case 'profile':
            return <ProfileModal setSelectedModal={setSelectedModal} />
         case 'change-password':
            return <SecurityModal setSelectedModal={setSelectedModal} />
         case 'login':
            return <LoginLogoutModal setSelectedModal={setSelectedModal} />
         case 'new-room':
            return <NewRoomModal setSelectedModal={setSelectedModal} />
         case 'join-room':
            return <JoinRoomModal socket={socket} setSelectedModal={setSelectedModal} />
         case 'edit-room':
            return <EditRoomModal setSelectedModal={setSelectedModal} />
         case 'change-room-password':
            return <RoomSecurityModal setSelectedModal={setSelectedModal} />
         default:
            return null
      }
   }

   return (
      <div className={styles.homePage}>
         <LeftSide />
         <RightSide
            setSelectedModal={setSelectedModal}
            setSendMessage={setSendMessage}
            receivedMessage={receivedMessage}
            socket={socket}
         />

         {renderModals()}
      </div>
   )
}

export default HomePage
