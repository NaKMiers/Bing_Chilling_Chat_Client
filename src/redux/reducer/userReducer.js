const initState = {
   userData: JSON.parse(localStorage.getItem('profile')) || { user: null, token: '' },
   loading: false,
   error: false,
}

function reducer(state = initState, action) {
   switch (action.type) {
      case 'LOGIN_START':
         return { ...state, loading: true, error: false }

      case 'LOGIN_SUCCESS':
         localStorage.setItem('profile', JSON.stringify(action.payload))
         return { ...state, userData: action.payload, loading: false, error: false }

      case 'LOGIN_FAIL':
         return { ...state, loading: false, error: true }

      case 'REGISTER_START':
         return { ...state, loading: true, error: false }

      case 'REGISTER_SUCCESS':
         localStorage.setItem('profile', JSON.stringify(action.payload))
         return { ...state, userData: action.payload, loading: false, error: false }

      case 'REGISTER_FAIL':
         return { ...state, loading: false, error: true }

      case 'LOGOUT':
         localStorage.clear()
         return {
            userData: { user: null, token: '' },
            loading: false,
            error: false,
         }

      default:
         return state
   }
}

export default reducer
