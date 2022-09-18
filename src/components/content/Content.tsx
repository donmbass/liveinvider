import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../../hooks/react-redux';
import Chat from '../chat/Chat';
import InputField from '../chat/inputField/InputField';
import Login from '../login/Login';
import Profile from '../profile/Profile';
import Registration from '../registration/Registration';
import Users from '../users/Users';
import classes from './Content.module.scss';

interface IProps {}

const Content: React.FC<IProps> = (props) => {
    const isAuth = useAppSelector((state) => state.userSlice.authData.isAuth);
    return (
        <div className={classes.wrapper}>
            <Routes>
                <Route index element={<Navigate to='chat' />} />
                <Route
                    path='chat'
                    element={
                        isAuth ? (
                            <div className={classes.chat}>
                                <Chat />
                                <InputField />
                            </div>
                        ) : (
                            <Navigate to='../login' />
                        )
                    }
                />
                <Route
                    path='users'
                    element={isAuth ? <Users /> : <Navigate to='../login' />}
                />
                <Route
                    path='login'
                    element={!isAuth ? <Login /> : <Navigate to='../chat' />}
                />

                <Route
                    path='registration'
                    element={
                        !isAuth ? <Registration /> : <Navigate to='../chat' />
                    }
                />
                <Route path='profile/:uid' element={<Profile />} />
            </Routes>
        </div>
    );
};
export default Content;
