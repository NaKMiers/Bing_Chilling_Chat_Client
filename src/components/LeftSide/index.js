import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UilSearch } from '@iconscout/react-unicons'
import roomAction from '../../actions/roomAction'
import LogoSearch from '../LogoSearch'
import Rooms from '../Rooms'
import Room from '../Rooms/Room'
import styles from './LeftSide.module.scss'

function LeftSide() {
   const dispatch = useDispatch()
   const { user } = useSelector(state => state.userReducer.userData)
   let rooms = useSelector(state => state.roomReducer.roomData)

   const [searchValue, setSearchValue] = useState('')

   const setCurRoom = room => {
      dispatch(roomAction.setCurRoom(room))
   }

   rooms = rooms.filter(room => room.title.toLowerCase().includes(searchValue))

   return (
      <div className={styles.leftSide}>
         {/* LogoSearch */}
         <div className={styles.logoSearch}>
            <img className={styles.logo} src='https://bom.so/FWOSVO' alt='logo' />
            <div className={styles.inputWrap}>
               <input
                  className={styles.searchInput}
                  type='text'
                  placeholder='Search...'
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value.toLowerCase())}
               />
               <div className={styles.searchBtn}>
                  <UilSearch />
               </div>
            </div>
         </div>

         {/* <Rooms /> */}
         <div className={styles.rooms}>
            <h3>Rooms</h3>
            <hr />

            {rooms.map((room, index) => (
               <div key={room._id} onClick={() => setCurRoom(room)}>
                  <Room room={room} />
               </div>
            ))}
         </div>
      </div>
   )
}

export default LeftSide
