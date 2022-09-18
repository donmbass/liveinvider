import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IShortUser } from '../types/user';

interface IState {
    users: IShortUser[];
}

const initialState: IState = {
    users: [],
};

const usersSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUsers(state, action: PayloadAction<IShortUser[]>) {
            state.users = action.payload;
        },
    },
});

export default usersSlice.reducer;

export const { setUsers } = usersSlice.actions;
