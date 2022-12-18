const initState = {
   userData: JSON.parse(localStorage.getItem('profile')) || { user: null, token: '' },
   curModal: '',
   loading: false,
   error: false,
}

function reducer(state = initState, action) {
   switch (action.type) {
      case 'LOGIN_SUCCESS':
         localStorage.setItem('profile', JSON.stringify(action.payload))
         return { ...state, userData: action.payload, loading: false, error: false }

      case 'REGISTER_SUCCESS':
         localStorage.setItem('profile', JSON.stringify(action.payload))
         return { ...state, userData: action.payload, loading: false, error: false }

      case 'LOGOUT':
         localStorage.clear()
         return {
            userData: { user: null, token: '' },
            curModal: '',
            loading: false,
            error: false,
         }

      case 'EDIT_PROFILE':
         const token = JSON.parse(localStorage.getItem('profile')).token
         localStorage.setItem('profile', JSON.stringify({ user: action.payload, token }))
         return {
            ...state,
            userData: { ...state.userData, user: action.payload },
            loading: false,
            error: false,
         }

      case 'CHANGE_CUR_MODAL':
         return { ...state, curModal: action.payload, loading: false, error: false }

      default:
         return state
   }
}

export default reducer
