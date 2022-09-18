import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDocument, useDocumentData } from 'react-firebase-hooks/firestore';
import { Link } from 'react-router-dom';
import { fireDatabase } from '../../firebase';
import { useAppDispatch } from '../../hooks/react-redux';
import { useAuth } from '../../hooks/auth-hooks';
import { setUser } from '../../store/userSlice';
import { IUser } from '../../types/user';
import classes from './Login.module.scss';

const Login: React.FC = () => {
    const auth = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        pass: '',
        passRepeat: '',
    });
    const [notification, setNotification] = useState('');

    const login = () => {
        const message = auth.loginUser(formData.email, formData.pass);
        message.then((msg) => {
            if (msg) {
                setNotification(msg);
            } else {
                setNotification('');
            }
        });
    };

    const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prevData) => ({ ...prevData, email: e.target.value }));
    };
    const passChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prevData) => ({ ...prevData, pass: e.target.value }));
    };

    const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login();
    };

    return (
        <div className={classes.wrapper}>
            {notification && (
                <div className={classes.notification}>
                    <span>{notification}</span>
                </div>
            )}

            <h2>Вход</h2>
            <form onSubmit={formSubmitHandler}>
                <label>Почта</label>
                <input
                    type='email'
                    autoComplete='on'
                    placeholder='@_@'
                    value={formData.email}
                    onChange={emailChangeHandler}
                    required
                />
                <label>Пароль</label>
                <input
                    type='password'
                    autoComplete='on'
                    placeholder='*_*'
                    value={formData.pass}
                    onChange={passChangeHandler}
                    required
                />

                <input
                    className={classes.submitButton}
                    type='submit'
                    value='Войти'
                />
            </form>
            <span className={classes.bottomMessage}>
                Нет аккаунта, тогда{' '}
                <Link to='../registration'>зарегистрируйтесь</Link>
            </span>
        </div>
    );
};
export default Login;
