import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import usersSlice from './usersSlice';
import profileSlice from './profileSlice';
import chatSlice from './chatSlice';

const store = configureStore({
    reducer: { userSlice, chatSlice, profileSlice, usersSlice },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
