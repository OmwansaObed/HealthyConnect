import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // { id, name, email, image, role, ... }
  isAuthenticated: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    setUserError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, clearUser, setUserError } = userSlice.actions;
export default userSlice.reducer;
