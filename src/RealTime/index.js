import moment from 'moment'
import { memo } from 'react'
import { useEffect, useState } from 'react'

function RealTime() {
   const [time, setTime] = useState()

   useEffect(() => {
      let interval
      const handleTime = () => {
         interval = setInterval(() => {
            setTime(Date.now())
         }, 1000)
      }
      handleTime()
      return () => {
         clearInterval(interval)
      }
   }, [])

   return (
      <>
         <span style={{ color: '#f44336' }}>{moment(time).format('hh')}</span>
         <span style={{ color: '#2196f3' }}>{moment(time).format(':mm')}</span>
         <span style={{ color: '#4caf50' }}>{moment(time).format(':ss')}</span>
      </>
   )
}

export default memo(RealTime)
