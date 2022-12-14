const initState = {
   roomData: JSON.parse(localStorage.getItem('room-data')) || [],
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
   let roomData = []
   let index = -1

   switch (action.type) {
      case 'GET_ALL_ROOMS_START':
         return { ...state, loading: true, error: false }
      case 'GET_ALL_ROOMS_SUCCESS':
         localStorage.setItem('room-data', JSON.stringify(action.payload))
         return { ...state, roomData: action.payload, loading: false, error: false }
      case 'GET_ALL_ROOMS_FAIL':
         return { ...state, loading: false, error: true }

      case 'CREATE_ROOM_START':
         return { ...state, loading: true, error: false }
      case 'CREATE_ROOM_SUCCESS':
         roomData = JSON.parse(localStorage.getItem('room-data'))
         localStorage.setItem('room-data', JSON.stringify([action.payload, ...roomData]))
         return {
            ...state,
            roomData: [action.payload, ...state.roomData],
            loading: false,
            error: false,
         }
      case 'CREATE_ROOM_FAIL':
         return { ...state, loading: false, error: true }

      case 'JOIN_ROOM_START':
         return { ...state, loading: true, error: false }
      case 'JOIN_ROOM_SUCCESS':
         roomData = JSON.parse(localStorage.getItem('room-data'))
         localStorage.setItem('room-data', JSON.stringify([action.payload, ...roomData]))
         return {
            ...state,
            roomData: [action.payload, ...state.roomData],
            loading: false,
            error: false,
         }
      case 'JOIN_ROOM_FAIL':
         return { ...state, loading: false, error: true }

      case 'LEAVE_START':
         return { ...state, loading: true, error: false }
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
      case 'LEAVE_FAIL':
         return { ...state, loading: false, error: true }

      case 'EDIT_START':
         return { ...state, loading: true, error: false }
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
      case 'EDIT_FAIL':
         return { ...state, loading: false, error: true }

      case 'SET_CUR_ROOM':
         localStorage.setItem('cur-room', JSON.stringify(action.payload))
         return { ...state, curRoom: action.payload }

      case 'CLEAR_ALL':
         return {
            roomData: [],
            curRoom: null,
            loading: false,
            error: false,
         }

      default:
         return state
   }
}

export default reducer
