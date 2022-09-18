import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { limit } from 'firebase/firestore';
import { IMessage } from '../types/message';
import { IUser } from '../types/user';

interface IState {
    messages: IMessage[] | null;
    limit: number;
    isAllLoaded: boolean;
    increaseValue: number;
}

const initialState: IState = {
    messages: null,
    limit: 10,
    increaseValue: 10,
    isAllLoaded: false,
};

const chatSlice = createSlice({
    name: 'chat',
    initialState: initialState,
    reducers: {
        setMessages(state, action: PayloadAction<IMessage[]>) {
            state.messages = action.payload.reverse();
            if (action.payload.length < state.limit) {
                state.isAllLoaded = true;
            } else {
                state.isAllLoaded = false;
            }
        },
        increaseLimit(state) {
            state.limit += state.increaseValue;
        },
    },
});

export default chatSlice.reducer;

export const { setMessages, increaseLimit } = chatSlice.actions;
