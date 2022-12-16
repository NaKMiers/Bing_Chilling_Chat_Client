import { UilCheck, UilCopy, UilEllipsisV } from '@iconscout/react-unicons'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import roomAction from '../../../actions/roomAction'
import roomApi from '../../../apis/roomApi'
import styles from './ChatHeader.module.scss'

function ChatHeader({ socket, setSelectedModal }) {
   const dispatch = useDispatch()
   const { user } = useSelector(state => state.userReducer.userData)
   const curRoom = useSelector(state => state.roomReducer.curRoom)
   const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

   const [isCopyRoomId, setCopyRoomId] = useState(false)

   const [showMenu, setShowMenu] = useState(false)

   const hanleCopyRoomId = () => {
      if (!isCopyRoomId) {
         navigator.clipboard.writeText(curRoom._id)
         setCopyRoomId(!isCopyRoomId)
      }
   }

   const handleShowMenu = () => {
      setShowMenu(!showMenu)
      setCopyRoomId(false)
   }

   const handleSelectedModal = value => {
      setSelectedModal(value)
      setShowMenu(false)
   }

   const handleLeave = async () => {
      // leave room in server
      dispatch(roomAction.leaveRoomStart())
      try {
         await roomApi.leaveRoom(curRoom._id, user._id)
         dispatch(roomAction.leaveRoomSuccess(curRoom._id))

         // leave room in socket.io
         socket.current.emit('leave-room', { userLeaveId: user._id, roomId: curRoom._id })
      } catch (err) {
         console.log(err)
         dispatch(roomAction.leaveRoomFail())
      }
   }

   return (
      <div className={styles.chatHeader}>
         <div className={styles.curChat}>
            <div className={styles.avatar}>
               <div className={styles.onlineDot}></div>
               <img
                  className={styles.image}
                  src={serverPublic + (curRoom.avatar || 'defaultGroupAvatar.png')}
                  alt='avatar'
               />
            </div>
            <div className={styles.roomInfo}>
               <span>{curRoom.title}</span>
               <span>Online</span>
            </div>
         </div>

         <div className={`${styles.menuIcon} icon`} onClick={handleShowMenu}>
            <UilEllipsisV />
         </div>

         {showMenu && (
            <div className={styles.menus}>
               <div className={styles.menuItem} onClick={hanleCopyRoomId}>
                  Id: {curRoom._id}
                  {isCopyRoomId ? (
                     <div className={styles.copyIcon}>
                        <UilCheck />
                     </div>
                  ) : (
                     <div className={styles.copyIcon}>
                        <UilCopy />
                     </div>
                  )}
               </div>
               <div className={styles.menuItem} onClick={() => handleSelectedModal('edit-room')}>
                  Edit Room
               </div>
               <div
                  className={styles.menuItem}
                  onClick={() => handleSelectedModal('change-room-password')}
               >
                  Security
               </div>
               <div className={styles.menuItem} onClick={handleLeave}>
                  Leave
               </div>
            </div>
         )}
      </div>
   )
}

export default ChatHeader
