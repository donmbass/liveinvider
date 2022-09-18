import {
    child,
    get,
    limitToLast,
    push,
    query,
    ref,
    update,
} from 'firebase/database';
import { useEffect } from 'react';
import { useListKeys } from 'react-firebase-hooks/database';
import { database } from '../firebase';
import {
    increasePostsLimit,
    resetPostsLimit,
    setPosts,
} from '../store/profileSlice';
import { IPost } from '../types/post';
import { useAppDispatch, useAppSelector } from './react-redux';

export const useWall = () => {
    const dispatch = useAppDispatch();
    const myId = useAppSelector((state) => state.userSlice.userData?.uid);

    return {
        loadPosts(uid: string, limit: number) {
            const dbRef = ref(database);
            get(query(child(dbRef, `posts/${uid}`), limitToLast(limit)))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        dispatch(setPosts(Object.values(snapshot.val())));
                    } else {
                        dispatch(setPosts([]));
                        dispatch(resetPostsLimit());
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        sendPost(data: IPost) {
            interface update {
                [key: string]: IPost;
            }

            const newPostKey = push(child(ref(database), `/posts/${myId}`)).key;
            const updates: update = {};
            if (newPostKey) {
                const postData = { ...data, id: newPostKey };

                updates[`/posts/${myId}/${newPostKey}`] = postData;
                update(ref(database), updates);
            }
        },
        deletePost(id: string) {
            interface update {
                [key: string]: null;
            }
            const updates: update = {};
            updates[`/posts/${myId}/${id}`] = null;
            update(ref(database), updates);
        },
    };
};
