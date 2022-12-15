import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import LogoSearch from '../LogoSearch'
import Rooms from '../Rooms'
import styles from './LeftSide.module.scss'

function LeftSide() {
   let rooms = useSelector(state => state.roomReducer.roomData)

   const [searchValue, setSearchValue] = useState('')

   rooms = rooms.filter(room => room.title.toLowerCase().includes(searchValue))

   return (
      <div className={styles.leftSide}>
         <LogoSearch searchValue={searchValue} setSearchValue={setSearchValue} />

         <Rooms rooms={rooms} />
      </div>
   )
}

export default LeftSide
