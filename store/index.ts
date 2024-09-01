import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';
import searchReducer from './searchSlice';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
