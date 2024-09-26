// userSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  data: any;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  data: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.data = action.payload;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.data = null;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;