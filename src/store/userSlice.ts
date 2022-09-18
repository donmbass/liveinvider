import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../types/user';

interface IState {
    authData: {
        isAuth: boolean;
        token: string | null;
    };
    userData: IUser | null;
}

const initialState: IState = {
    authData: {
        isAuth: false,
        token: null,
    },
    userData: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser>) {
            state.authData.isAuth = true;
            state.userData = action.payload;
        },
        setToken(state, action: PayloadAction<string>) {
            state.authData.token = action.payload;
        },
        logOut(state) {
            state.authData.isAuth = false;
            state.authData.token = null;
            state.userData = null;
        },
    },
});

export default userSlice.reducer;

export const { setUser, setToken, logOut } = userSlice.actions;
