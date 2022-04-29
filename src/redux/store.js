// import { configureStore, combineReducers } from '@reduxjs/toolkit'
// import inviteReducer from './slices/invite'

// // const rootReducer = combineReducers({
// //     invite: inviteReducer,
// // })

// export default configureStore({
//   reducer: {
//       invite: inviteReducer,
//   }
// })


import { configureStore } from '@reduxjs/toolkit'
import friendReducer from './slices/friend'

export default configureStore({
  reducer: {
      friend: friendReducer
  }
})