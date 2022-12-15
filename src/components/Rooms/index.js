import React from 'react'
import { useDispatch } from 'react-redux'
import roomAction from '../../actions/roomAction'
import Room from './Room'
import styles from './Rooms.module.scss'

function Rooms({ rooms }) {
   const dispatch = useDispatch()

   const setCurRoom = room => {
      dispatch(roomAction.setCurRoom(room))
   }

   return (
      <div className={styles.rooms}>
         <h3>Rooms</h3>
         <hr />

         {rooms.map((room, index) => (
            <div key={room._id} onClick={() => setCurRoom(room)}>
               <Room room={room} />
            </div>
         ))}
      </div>
   )
}

export default Rooms
