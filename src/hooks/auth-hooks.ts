import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { child, get, push, ref, update } from 'firebase/database';
import { setDoc } from 'firebase/firestore';
import { database } from '../firebase';
import { setToken, setUser } from '../store/userSlice';
import { IMessage } from '../types/message';
import { IUser } from '../types/user';
import { useAppDispatch } from './react-redux';

export const useAuth = () => {
    const dispatch = useAppDispatch();
    return {
        registerUser(email: string, pass: string, name: string) {
            const auth = getAuth();
            const error = createUserWithEmailAndPassword(auth, email, pass)
                .then((userCredential) => {
                    const user = userCredential.user;
                    const userData: IUser = {
                        uid: user.uid,
                        name: name,
                        avatar: '',
                        age: '',
                        sex: '',
                        reliations: '',
                        status: '',
                        studyPlace: '',
                        workPlace: '',
                    };
                    interface update {
                        [key: string]: IUser;
                    }

                    const updates: update = {};
                    localStorage.setItem('token', user.refreshToken);
                    localStorage.setItem('uid', user.uid);
                    dispatch(setToken(user.refreshToken));
                    updates[`/users/${user.uid}`] = userData;
                    update(ref(database), updates);
                    dispatch(setUser(userData));
                })
                .catch((error) => {
                    const errorMessage = error.code;
                    console.log(errorMessage);
                    if (errorMessage === 'auth/invalid-email') {
                        return 'Почта не валидна';
                    } else if (errorMessage === 'auth/weak-password') {
                        return 'Слишком короткий пароль';
                    } else if (errorMessage === 'auth/email-already-in-use') {
                        return 'Такой аккаунт уже существует';
                    }
                });
            return error;
        },
        loginUser(email: string, pass: string) {
            const auth = getAuth();

            const error = signInWithEmailAndPassword(auth, email, pass)
                .then((userCredential) => {
                    const user = userCredential.user;
                    localStorage.setItem('token', user.refreshToken);
                    localStorage.setItem('uid', user.uid);
                    dispatch(setToken(user.refreshToken));
                    const dbRef = ref(database);
                    get(child(dbRef, `users/${user.uid}`))
                        .then((snapshot) => {
                            if (snapshot.exists()) {
                                dispatch(setUser(snapshot.val()));
                            } else {
                                console.log('No data available');
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                })
                .catch((error) => {
                    const errorMessage = error.code;

                    if (errorMessage === 'auth/user-not-found') {
                        return 'Пользователь с такой почтой не найден';
                    } else if (errorMessage === 'auth/wrong-password') {
                        return 'Неверный пароль';
                    }
                });
            return error;
        },
    };
};
