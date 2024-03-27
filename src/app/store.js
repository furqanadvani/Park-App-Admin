import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import allparkReducer from '../features/allParkSlice'

export const store = configureStore({
  reducer: {
    user : userReducer,
    AllPark : allparkReducer,
  },
});
