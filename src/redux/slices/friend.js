// import { createSlice } from '@reduxjs/toolkit'

// export const inviteSlice = createSlice({
//   name: 'invite',
//   initialState: {
//     peopleNo: null
//   },
//   reducers: {
//     dispatchPeopleNo: (state, action) => {
//       state.peopleNo = action.payload
//     }
//   },
// })

// // Action creators are generated for each case reducer function
// export const { dispatchPeopleNo } = inviteSlice.actions

// export default inviteSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

export const friendSlice = createSlice({
  name: 'friend',
  initialState: {
    time: null,
    peopleNo: null,
    location: null,
    radius: null,
    randomSelection: false,
    cuisine: null,
    friendGroupId: null,
  },
  reducers: {
    setTime: (state, action) => {
      state.time = action.payload
    },
    setPeopleNo: (state, action) => {
      state.peopleNo = action.payload
    },
    setRadius: (state, action) => {
      state.radius = action.payload
    },
    setRandomSelection: (state, action) => {
      state.randomSelection = action.payload
    },
    setCuisine: (state, action) => {
      state.cuisine = action.payload
    },
    setFriendGroupId: (state, action) => {
      state.friendGroupId = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setTime, setPeopleNo, setRadius, setRandomSelection, setCuisine, setFriendGroupId } = friendSlice.actions

export default friendSlice.reducer