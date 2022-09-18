import { child, get, ref, update } from 'firebase/database';
import { database } from '../firebase';
import { setProfile } from '../store/profileSlice';
import { IUser } from '../types/user';
import { useAppDispatch } from './react-redux';

export const useProfile = () => {
    const dispatch = useAppDispatch();
    return {
        getUserData(uid: string): Promise<IUser> {
            const dbRef = ref(database);
            const userData = get(child(dbRef, `users/${uid}`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        return snapshot.val();
                    } else {
                        console.log('No data available');
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
            return userData;
        },
        updateUserData(userData: IUser) {
            interface update {
                [key: string]: IUser;
            }

            const updates: update = {};

            updates[`/users/${userData.uid}`] = userData;
            update(ref(database), updates);
            dispatch(setProfile(userData));
        },
    };
};
