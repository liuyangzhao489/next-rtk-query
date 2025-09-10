import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import studentSlice from './studentSlice'
import { studentApi } from './studentApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: studentSlice,
    [studentApi.reducerPath]: studentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(studentApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

export default store