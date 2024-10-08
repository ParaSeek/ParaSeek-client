// userSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  data: any;
  isLoggedIn: boolean;
  loading: boolean;
}

const initialState: UserState = {
  data: null,
  isLoggedIn: false,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.data = action.payload;
      state.isLoggedIn = true;
    },
    toggleLoading(state, action){
      state.loading = action.payload
    },
    logout(state) {
      state.data = null;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout, toggleLoading } = userSlice.actions;
export default userSlice.reducer;