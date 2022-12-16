const roomAction = {
   getAllRoomsStart: () => ({ type: 'GET_ALL_ROOMS_START' }),
   getAllRoomsSuccess: data => ({ type: 'GET_ALL_ROOMS_SUCCESS', payload: data }),
   getAllRoomsFail: () => ({ type: 'GET_ALL_ROOMS_FAIL' }),

   createRoomStart: () => ({ type: 'CREATE_ROOM_START' }),
   createRoomSuccess: data => ({ type: 'CREATE_ROOM_SUCCESS', payload: data }),
   createRoomFail: () => ({ type: 'CREATE_ROOM_FAIL' }),

   joinRoomStart: () => ({ type: 'JOIN_ROOM_START' }),
   joinRoomSuccess: data => ({ type: 'JOIN_ROOM_SUCCESS', payload: data }),
   joinRoomFail: () => ({ type: 'JOIN_ROOM_FAIL' }),

   anotherUserJoinRoom: data => ({ type: 'ANOTHER_USER_JOIN_ROOM', payload: data }),
   anotherUserLeaveRoom: data => ({ type: 'ANOTHER_USER_LEAVE_ROOM', payload: data }),

   leaveRoomStart: () => ({ type: 'LEAVE_START' }),
   leaveRoomSuccess: data => ({ type: 'LEAVE_SUCCESS', payload: data }),
   leaveRoomFail: () => ({ type: 'LEAVE_FAIL' }),

   editRoomStart: () => ({ type: 'EDIT_START' }),
   editRoomSuccess: data => ({ type: 'EDIT_SUCCESS', payload: data }),
   editRoomFail: () => ({ type: 'EDIT_FAIL' }),

   setCurRoom: data => ({ type: 'SET_CUR_ROOM', payload: data }),
   clearCurRoom: () => ({ type: 'CLEAR_CUR_ROOM' }),

   clearAll: () => ({ type: 'CLEAR_ALL' }),
}

export default roomAction
