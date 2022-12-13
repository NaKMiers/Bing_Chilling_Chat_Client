const initState = {
   userData: {},
   loading: false,
   error: false,
}

function reducer(state = initState, action) {
   switch (action.type) {
      case '':
         return state

      default:
         return state
   }
}

export default reducer
