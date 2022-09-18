import { child, get, ref } from 'firebase/database';
import { collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect } from 'react';
import Layout from './components/Layout';
import { database, fireDatabase } from './firebase';
import { useAppDispatch } from './hooks/react-redux';
import { setToken, setUser } from './store/userSlice';

import { IUser } from './types/user';

function App() {
    const dispatch = useAppDispatch();
    const token = localStorage.getItem('token');
    const uid = localStorage.getItem('uid');
    if (token) {
        const dbRef = ref(database);
        get(child(dbRef, `users/${uid}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    dispatch(setToken(token));
                    dispatch(setUser(snapshot.val()));
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <>
            <Layout />
        </>
    );
}

export default App;
