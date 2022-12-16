const initState = {
   roomData: JSON.parse(localStorage.getItem('room-data')) || null,
   curRoom: JSON.parse(localStorage.getItem('cur-room')) || null,
   loading: false,
   error: false,
}

const findIndex = (array, id) => {
   let index = -1
   array.forEach((item, i) => {
      if (item._id === id) index = i
   })
   return index
}

function reducer(state = initState, action) {
   let roomData = null
   let curRoom
   let index = -1
   let userJoinId = action.payload?.userJoinId
   let userLeaveId = action.payload?.userLeaveId
   let roomId = action.payload?.roomId

   switch (action.type) {
      case 'GET_ALL_ROOMS_SUCCESS':
         localStorage.setItem('room-data', JSON.stringify(action.payload))
         return { ...state, roomData: action.payload, loading: false, error: false }

      case 'CREATE_ROOM_SUCCESS':
         roomData = JSON.parse(localStorage.getItem('room-data'))
         localStorage.setItem('room-data', JSON.stringify([action.payload, ...roomData]))
         return {
            ...state,
            roomData: [action.payload, ...state.roomData],
            loading: false,
            error: false,
         }

      case 'JOIN_ROOM_SUCCESS':
         roomData = JSON.parse(localStorage.getItem('room-data'))
         localStorage.setItem('room-data', JSON.stringify([action.payload, ...roomData]))
         return {
            ...state,
            roomData: [action.payload, ...state.roomData],
            loading: false,
            error: false,
         }

      case 'ANOTHER_USER_JOIN_ROOM':
         userJoinId = action.payload.userJoinId
         roomId = action.payload.roomId
         index = findIndex(state.roomData, roomId)
         roomData = JSON.parse(localStorage.getItem('room-data'))
         curRoom = JSON.parse(localStorage.getItem('cur-room'))

         localStorage.setItem(
            'room-data',
            JSON.stringify(
               roomData.map((room, i) =>
                  index === i ? { ...room, members: [...room.members, userJoinId] } : room
               )
            )
         )

         localStorage.setItem(
            'cur-room',
            JSON.stringify(
               state.curRoom?._id === roomId
                  ? { ...curRoom, members: [...curRoom.members, userJoinId] }
                  : curRoom
            )
         )

         return {
            ...state,
            roomData: state.roomData.map((room, i) =>
               index === i ? { ...room, members: [...room.members, userJoinId] } : room
            ),
            curRoom:
               state.curRoom?._id === roomId
                  ? { ...state.curRoom, members: [...state.curRoom.members, userJoinId] }
                  : state.curRoom,
            loading: false,
            error: false,
         }

      case 'ANOTHER_USER_LEAVE_ROOM':
         userLeaveId = action.payload.userLeaveId
         roomId = action.payload.roomId
         index = findIndex(state.roomData, roomId)
         roomData = JSON.parse(localStorage.getItem('room-data'))
         curRoom = JSON.parse(localStorage.getItem('cur-room'))

         localStorage.setItem(
            'room-data',
            JSON.stringify(
               roomData.map((room, i) =>
                  index === i
                     ? { ...room, members: room.members.filter(id => id !== userLeaveId) }
                     : room
               )
            )
         )

         localStorage.setItem(
            'cur-room',
            JSON.stringify(
               state.curRoom?._id === roomId
                  ? { ...curRoom, members: curRoom.members.filter(id => id !== userLeaveId) }
                  : curRoom
            )
         )

         return {
            ...state,
            roomData: state.roomData.map((room, i) =>
               index === i
                  ? { ...room, members: room.members.filter(id => id !== userLeaveId) }
                  : room
            ),
            curRoom:
               state.curRoom?._id === roomId
                  ? {
                       ...state.curRoom,
                       members: state.curRoom.members.filter(id => id !== userLeaveId),
                    }
                  : state.curRoom,
            loading: false,
            error: false,
         }

      case 'LEAVE_SUCCESS':
         roomData = JSON.parse(localStorage.getItem('room-data'))
         localStorage.setItem(
            'room-data',
            JSON.stringify(roomData.filter(room => room._id !== action.payload))
         )
         localStorage.removeItem('cur-room')
         return {
            ...state,
            roomData: state.roomData.filter(room => room._id !== action.payload),
            curRoom: null,
            loading: false,
            error: false,
         }

      case 'EDIT_SUCCESS':
         index = findIndex(state.roomData, action.payload._id)
         roomData = JSON.parse(localStorage.getItem('room-data'))
         localStorage.setItem(
            'room-data',
            JSON.stringify(roomData.map((room, i) => (i !== index ? room : action.payload)))
         )
         return {
            ...state,
            roomData: state.roomData.map((room, i) => (i !== index ? room : action.payload)),
            loading: false,
            error: false,
         }

      case 'SET_CUR_ROOM':
         localStorage.setItem('cur-room', JSON.stringify(action.payload))
         return { ...state, curRoom: action.payload }

      case 'CLEAR_ALL':
         return {
            roomData: null,
            curRoom: null,
            loading: false,
            error: false,
         }

      default:
         return state
   }
}

export default reducer
