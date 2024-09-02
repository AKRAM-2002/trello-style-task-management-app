import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


//actions
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (loginData, thunkAPI) => {
    try {
      const response = await axios.post('/api/auth/login', loginData);
      const token = response.data.token;

      // Assuming the backend sends the user data along with the token
      const userId = response.data.user.id; 

      // Save the token in cookies or local storage
      localStorage.setItem('token', token);

      // Dispatch the loginSuccess action with the userId
      thunkAPI.dispatch(loginSuccess({ userId }));

      return userId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);




const initialState = {
  userId: null,  // Initialize with null or an empty string if no user is logged in
  // other user properties...
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.userId = action.payload.userId;
      // other login success actions
    },
    logout(state) {
      state.userId = null;
      
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.userId = action.payload; // Set userId when login is successful
    });
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
