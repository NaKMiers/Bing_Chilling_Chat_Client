import React from 'react'
import Conversation from './Conversation'
import styles from './Conversations.module.scss'

function Conversations() {
   return (
      <div className={styles.conversations}>
         <h3>Conversations</h3>
         <hr />

         <Conversation />
         <Conversation />
         <Conversation />
         <Conversation />
      </div>
   )
}

export default Conversations
