import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstname: "",
  lastname: "",
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.token = action.payload.token;
    },
    logout(state) {
        state.firstname = "";
        state.lastname = "";
        state.token = "";
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;