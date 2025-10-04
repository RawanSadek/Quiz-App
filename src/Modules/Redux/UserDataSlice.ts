import { createSlice } from '@reduxjs/toolkit'
import type { UserDataTypes } from '../../SERVICES/INTERFACES'

export interface UserState {
  value: UserDataTypes | null
}

const storedProfile = localStorage.getItem("profile");
const initialData = storedProfile ? JSON.parse(storedProfile) : null;

const initialState: UserState = {
  value: initialData
}

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    getUserProfileData: (state) => {
      const stored = localStorage.getItem("profile");
      state.value = stored ? JSON.parse(stored) : null;
    },
    logout: (state) => {
      state.value = null;
      localStorage.removeItem("token");
      localStorage.removeItem("profile");
      //can't navigate here
    }
  },
})

// Action creators are generated for each case reducer function
export const { getUserProfileData, logout } = userSlice.actions

export default userSlice.reducer