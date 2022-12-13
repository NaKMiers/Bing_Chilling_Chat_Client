import React from 'react'
import Room from './Room'
import styles from './Rooms.module.scss'

function Rooms() {
   return (
      <div className={styles.rooms}>
         <h3>Rooms</h3>
         <hr />

         <Room />
         <Room />
         <Room />
         <Room />
      </div>
   )
}

export default Rooms
