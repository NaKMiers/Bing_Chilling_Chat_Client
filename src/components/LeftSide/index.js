import React, { memo, useState } from 'react'
import { useSelector } from 'react-redux'
import LogoSearch from '../LogoSearch'
import Rooms from '../Rooms'
import styles from './LeftSide.module.scss'

function LeftSide({ hide, setHide }) {
   let rooms = useSelector(state => state.roomReducer.roomData)

   const [searchValue, setSearchValue] = useState('')

   rooms = rooms?.filter(room => room.title.toLowerCase().includes(searchValue))

   return (
      <div className={`${styles.leftSide} ${hide === 'left' ? styles.hide : ''}`}>
         <LogoSearch searchValue={searchValue} setSearchValue={setSearchValue} />

         <Rooms rooms={rooms} hide={hide} setHide={setHide} />
      </div>
   )
}

export default memo(LeftSide)
