import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: null,
    // other auth state
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.userId = action.payload.userId;
      // other login success actions
    },
    // other reducers
  },
});

export const { loginSuccess } = authSlice.actions;

export default authSlice.reducer;
