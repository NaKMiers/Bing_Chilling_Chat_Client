import React, { useState } from 'react'
import styles from './NewRoomModal.module.scss'

function NewRoomModal({ setSelectedModal }) {
   const [formData, setFormData] = useState({ title: '', password: '' })
   const [security, setSecurity] = useState(false)

   const handleChange = e => {
      setFormData({ [e.target.name]: e.target.value })
   }

   const handleSubmit = e => {
      e.preventDefault()
   }

   return (
      <div className={styles.NewRoomModal}>
         <form onSubmit={handleSubmit}>
            <h3>Title...</h3>

            <input
               name='title'
               className={styles.usernameInput}
               type='text'
               placeholder='Title...'
               value={formData.title}
               onChange={handleChange}
            />

            <div className={styles.security}>
               <label htmlFor='security'>Security</label>
               <input
                  id='security'
                  type='checkbox'
                  name='security'
                  onChange={e => setSecurity(!security)}
               />
            </div>

            {security && (
               <input
                  name='password'
                  className={styles.usernameInput}
                  type='text'
                  placeholder='Password...'
                  value={formData.password}
                  onChange={handleChange}
               />
            )}

            <div className={styles.buttonWrap}>
               <button className={`${styles.saveBtn} button`}>Create</button>
               <button className={`${styles.cancelBtn}`} onClick={() => setSelectedModal('')}>
                  Cancle
               </button>
            </div>
         </form>
      </div>
   )
}

export default NewRoomModal
