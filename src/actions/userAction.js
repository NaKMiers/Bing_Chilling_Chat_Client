const userAction = {
   loginStart: () => ({ type: 'LOGIN_START' }),
   loginSuccess: data => ({ type: 'LOGIN_SUCCESS', payload: data }),
   loginFail: () => ({ type: 'LOGIN_FAIL' }),

   registerStart: () => ({ type: 'REGISTER_START' }),
   registerSuccess: data => ({ type: 'REGISTER_SUCCESS', payload: data }),
   registerFail: () => ({ type: 'REGISTER_FAIL' }),

   logout: () => ({ type: 'LOGOUT' }),

   editProfile: data => ({ type: 'EDIT_PROFILE', payload: data }),
}

export default userAction
