import React, { useEffect, useState } from 'react'
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
import SecurityModal from '../../components/SecurityModal'
import styles from './HomePage.module.scss'

function HomePage() {
   const dispatch = useDispatch()
   const { user } = useSelector(state => state.userReducer.userData)
   const [selectedModal, setSelectedModal] = useState('')

   useEffect(() => {
      const fetchAllRooms = async () => {
         dispatch(roomAction.getAllRoomsStart())
         try {
            const res = await roomApi.getAllRooms(user?._id)
            console.log('res-get-all-rooms: ', res)
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
            return <JoinRoomModal setSelectedModal={setSelectedModal} />
         case 'edit-room':
            return <EditRoomModal setSelectedModal={setSelectedModal} />
         default:
            return null
      }
   }

   return (
      <div className={styles.homePage}>
         <LeftSide />
         <RightSide setSelectedModal={setSelectedModal} />

         {renderModals()}
      </div>
   )
}

export default HomePage
