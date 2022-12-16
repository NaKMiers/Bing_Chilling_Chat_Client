import React, { memo, useEffect, useRef, useState } from 'react'
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
   const curModal = useSelector(state => state.userReducer.curModal)
   const roomData = useSelector(state => state.roomReducer.roomData)
   const curRoom = useSelector(state => state.roomReducer.curRoom)
   const socket = useRef()

   const [isConnectSocket, setConnectSocket] = useState(false)
   const [sendMessage, setSendMessage] = useState(null)
   const [receivedMessage, setReceivedMessage] = useState(null)
   const [hide, setHide] = useState('right')

   // Connect to socket.io
   useEffect(() => {
      if (roomData) {
         socket.current = io('http://localhost:3002')
         socket.current.emit('new-user-add', {
            newUserId: user?._id,
            rooms: roomData.map(room => room._id),
         })
         setConnectSocket(true)
      }
   }, [user?._id, roomData])

   // Send message to socket.io
   useEffect(() => {
      if (isConnectSocket) {
         if (sendMessage !== null) {
            socket.current.emit('send-message', sendMessage)
         }
      }
   }, [sendMessage, isConnectSocket])

   // Receive message from socket.io
   useEffect(() => {
      if (isConnectSocket) {
         socket.current.on('receive-message', data => {
            console.log('data received-message', data)
            setReceivedMessage(data)
         })
      }
   }, [isConnectSocket])

   // When user JOIN room from socket.io
   useEffect(() => {
      if (isConnectSocket) {
         socket.current.on('join-room', data => {
            console.log('join-room-data: ', data)
            dispatch(roomAction.anotherUserJoinRoom(data))
         })
      }
   }, [dispatch, isConnectSocket, curRoom])

   // When user LEAVE room from socket.io
   useEffect(() => {
      if (isConnectSocket) {
         socket.current.on('leave-room', data => {
            console.log('leave-room-data: ', data)
            console.log('curRoom: ', curRoom)
            dispatch(roomAction.anotherUserLeaveRoom(data))
         })
      }
   }, [dispatch, isConnectSocket, curRoom])

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
      switch (curModal) {
         case 'profile':
            return <ProfileModal />
         case 'change-password':
            return <SecurityModal />
         case 'login':
            return <LoginLogoutModal />
         case 'new-room':
            return <NewRoomModal socket={socket} />
         case 'join-room':
            return <JoinRoomModal socket={socket} />
         case 'edit-room':
            return <EditRoomModal />
         case 'change-room-password':
            return <RoomSecurityModal />
         default:
            return null
      }
   }

   return (
      <div className={styles.homePage}>
         <LeftSide hide={hide} setHide={setHide} />
         <RightSide
            hide={hide}
            setHide={setHide}
            setSendMessage={setSendMessage}
            receivedMessage={receivedMessage}
            socket={socket}
         />

         {renderModals()}
      </div>
   )
}

export default memo(HomePage)
