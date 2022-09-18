import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import {
    addDoc,
    collection,
    doc,
    query,
    setDoc,
    updateDoc,
    where,
} from 'firebase/firestore';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import {
    useCollectionData,
    useDocumentData,
} from 'react-firebase-hooks/firestore';
import { Link } from 'react-router-dom';
import { fireDatabase } from '../../firebase';
import { useAppDispatch } from '../../hooks/react-redux';
import { useAuth } from '../../hooks/auth-hooks';
import { setUser } from '../../store/userSlice';
import { IUser } from '../../types/user';
import classes from './Registration.module.scss';

const Registration: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        pass: '',
        passRepeat: '',
    });
    const auth = useAuth();
    const nickChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prevData) => ({ ...prevData, name: e.target.value }));
    };
    const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prevData) => ({ ...prevData, email: e.target.value }));
    };
    const passChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prevData) => ({ ...prevData, pass: e.target.value }));
    };
    const passRepeatChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            passRepeat: e.target.value,
        }));
    };
    const [notification, setNotification] = useState('');

    const register = () => {
        if (formData.pass === formData.passRepeat) {
            const message = auth.registerUser(
                formData.email,
                formData.pass,
                formData.name
            );
            message.then((msg) => {
                if (msg) {
                    setNotification(msg);
                } else {
                    setNotification('');
                }
            });
        } else {
            setNotification('Пароли не совпадают');
        }
    };

    const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        register();
    };

    return (
        <div className={classes.wrapper}>
            {notification && (
                <div className={classes.notification}>
                    <span>{notification}</span>
                </div>
            )}
            <h2>Регистрация</h2>
            <form onSubmit={formSubmitHandler}>
                <label>Ник</label>
                <input
                    type='name'
                    autoComplete='on'
                    placeholder='0_0'
                    value={formData.name}
                    onChange={nickChangeHandler}
                    required
                />
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
                    placeholder='минимум 6 символов'
                    value={formData.pass}
                    onChange={passChangeHandler}
                    required
                />
                <label>Повтор пароля</label>
                <input
                    type='password'
                    autoComplete='on'
                    placeholder='пароли должны совпадать'
                    value={formData.passRepeat}
                    onChange={passRepeatChangeHandler}
                    required
                />
                <input
                    className={classes.submitButton}
                    type='submit'
                    value='Зарегистрироваться'
                />
            </form>

            <span className={classes.bottomMessage}>
                <Link to='../login'>Уже есть аккаунт?</Link>
            </span>
        </div>
    );
};
export default Registration;
