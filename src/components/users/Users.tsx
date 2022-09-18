import { child, get, ref } from 'firebase/database';
import React, { useEffect } from 'react';
import { database } from '../../firebase';
import { useAppDispatch, useAppSelector } from '../../hooks/react-redux';
import { setUsers } from '../../store/usersSlice';
import UserItem from './userItem/UserItem';
import classes from './Users.module.scss';

const Users: React.FC = () => {
    const users = useAppSelector((state) => state.usersSlice.users);
    const dispatch = useAppDispatch();
    useEffect(() => {
        const dbRef = ref(database);
        get(child(dbRef, `users`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    dispatch(setUsers(Object.values(snapshot.val())));
                } else {
                    console.log('No data available');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div className={classes.users}>
            <h2 className={classes.title}>Пользователи</h2>
            <div className={classes.wrapper}>
                <div className={classes.userList}>
                    {users?.map((user) => (
                        <UserItem user={user} key={user.uid} />
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Users;
