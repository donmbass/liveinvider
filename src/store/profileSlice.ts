import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPost } from '../types/post';
import { IUser } from '../types/user';

interface IState {
    userData: IUser | null;
    posts: IPost[] | null;
    limit: number;
    isAllLoaded: boolean;
    increaseValue: number;
}

const initialState: IState = {
    userData: null,
    posts: null,
    limit: 10,
    increaseValue: 10,
    isAllLoaded: false,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        setProfile(state, action: PayloadAction<IUser>) {
            state.userData = action.payload;
        },
        setPosts(state, action: PayloadAction<IPost[]>) {
            state.posts = action.payload.sort(
                (a, b) => b.createdAt - a.createdAt
            );
            if (action.payload.length < state.limit) {
                state.isAllLoaded = true;
            } else {
                state.isAllLoaded = false;
            }
        },
        increasePostsLimit(state) {
            state.limit += state.increaseValue;
        },
        resetPostsLimit(state) {
            state.limit = state.increaseValue;
        },
    },
});

export default profileSlice.reducer;
export const { setProfile, setPosts, increasePostsLimit, resetPostsLimit } =
    profileSlice.actions;
