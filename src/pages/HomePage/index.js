import React, { useState } from 'react'
import JoinRoomModal from '../../components/JoinRoomModal'
import LeftSide from '../../components/LeftSide'
import LoginLogoutModal from '../../components/LoginLogoutModal'
import NewRoomModal from '../../components/NewRoomModal'
import ProfileModal from '../../components/ProfileModal'
import RightSide from '../../components/RightSide'
import Security from '../../components/Security'
import styles from './HomePage.module.scss'

function HomePage() {
   const [selectedModal, setSelectedModal] = useState('')

   const renderModals = () => {
      switch (selectedModal) {
         case 'profile':
            return <ProfileModal setSelectedModal={setSelectedModal} />
         case 'change-password':
            return <Security setSelectedModal={setSelectedModal} />
         case 'login':
            return <LoginLogoutModal setSelectedModal={setSelectedModal} />
         case 'new-room':
            return <NewRoomModal setSelectedModal={setSelectedModal} />
         case 'join-room':
            return <JoinRoomModal setSelectedModal={setSelectedModal} />

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
