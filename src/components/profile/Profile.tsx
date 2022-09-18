import React, { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classes from './Profile.module.scss';
import placeholder from '../../static/media/avatar.png';
import { useProfile } from '../../hooks/profile-hooks';
import { useAppDispatch, useAppSelector } from '../../hooks/react-redux';
import {
    resetPostsLimit,
    setPosts,
    setProfile,
} from '../../store/profileSlice';
import { IUser } from '../../types/user';
import PostsList from './postsList/PostsList';
import CreatePost from './createPost/CreatePost';

const Profile: React.FC = () => {
    const myId = useAppSelector((state) => state.userSlice.userData?.uid);
    const params = useParams();
    const dispatch = useAppDispatch();
    const profile = useProfile();
    useEffect(() => {
        const uid = params.uid;
        if (uid) {
            profile.getUserData(uid).then((data) => dispatch(setProfile(data)));
        }
        return () => {
            dispatch(setPosts([]));
            dispatch(resetPostsLimit());
        };
    }, [params.uid]);
    const userData = useAppSelector((state) => state.profileSlice.userData);
    const isMyProfile = userData?.uid === myId;
    const [isEditMode, setIsEditMode] = useState(false);
    useEffect(() => {
        setFormData(userData);
    }, [userData]);
    const [formData, setFormData] = useState<IUser | null>();

    const enableEditMode = () => {
        if (isMyProfile) {
            setIsEditMode(true);
        }
    };

    const sexChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setFormData((prev) => {
            if (prev) {
                return { ...prev, sex: e.target.value };
            }
        });
    };
    const ageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => {
            if (prev) {
                return { ...prev, age: +e.target.value };
            }
        });
    };
    const statusChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setFormData((prev) => {
            if (prev) {
                return { ...prev, status: e.target.value };
            }
        });
    };

    const nameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => {
            if (prev) {
                return { ...prev, name: e.target.value };
            }
        });
    };
    const reliationsChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setFormData((prev) => {
            if (prev) {
                return { ...prev, reliations: e.target.value };
            }
        });
    };
    const workPlaceChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setFormData((prev) => {
            if (prev) {
                return { ...prev, workPlace: e.target.value };
            }
        });
    };
    const studyPlaceChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setFormData((prev) => {
            if (prev) {
                return { ...prev, studyPlace: e.target.value };
            }
        });
    };

    const cancelChanges = () => {
        setIsEditMode(false);
        setFormData(userData);
    };

    const saveChanges = () => {
        setIsEditMode(false);
        if (formData) {
            profile.updateUserData(formData);
        }
    };

    const changeAvatar = () => {
        const link = prompt('Вставьте ссылку на картинку');
        if (link) {
            setFormData((prev) => {
                if (prev) {
                    return { ...prev, avatar: link };
                }
            });
        }
    };

    return (
        <div className={classes.profile}>
            <div className={classes.wrapper}>
                <div className={classes.top}>
                    {isMyProfile && (
                        <>
                            {isEditMode ? (
                                <>
                                    <div
                                        className={classes.saveButton}
                                        onClick={saveChanges}
                                    >
                                        <span>✔</span>
                                    </div>
                                    <div
                                        className={classes.cancelButton}
                                        onClick={cancelChanges}
                                    >
                                        <span>✖</span>
                                    </div>
                                </>
                            ) : (
                                <div
                                    className={classes.editButton}
                                    onClick={enableEditMode}
                                >
                                    <span>✎</span>
                                </div>
                            )}
                        </>
                    )}

                    <div className={classes.left}>
                        {isEditMode ? (
                            <img
                                src={
                                    formData?.avatar
                                        ? formData.avatar
                                        : placeholder
                                }
                                alt='avatar'
                                onClick={changeAvatar}
                                className={classes.editModeAvatar}
                            />
                        ) : (
                            <img
                                src={
                                    userData?.avatar
                                        ? userData.avatar
                                        : placeholder
                                }
                                alt='avatar'
                            />
                        )}
                    </div>
                    <div className={classes.right}>
                        <div className={classes.top}>
                            <div className={classes.name}>
                                {isEditMode ? (
                                    <input
                                        className={classes.input}
                                        placeholder='Введите значение'
                                        onChange={nameChangeHandler}
                                        value={formData?.name}
                                        style={{
                                            fontSize: '24px',
                                            fontWeight: 600,
                                        }}
                                    />
                                ) : (
                                    <h2>{userData?.name}</h2>
                                )}
                            </div>
                            <div className={classes.status}>
                                {isEditMode ? (
                                    <textarea
                                        className={classes.input}
                                        placeholder='Введите значение'
                                        onChange={statusChangeHandler}
                                        value={formData?.status}
                                    />
                                ) : (
                                    <span>
                                        {userData?.status
                                            ? `«${userData.status}»`
                                            : 'статуса нет'}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className={classes.properties}>
                            <div className={classes.property}>
                                <div className={classes.propertyName}>
                                    <span>Пол</span>
                                </div>
                                <div className={classes.propertyValue}>
                                    {isEditMode ? (
                                        <select
                                            className={classes.input}
                                            onChange={sexChangeHandler}
                                            value={formData?.sex}
                                        >
                                            <option></option>
                                            <option>М</option>
                                            <option>Ж</option>
                                        </select>
                                    ) : (
                                        <span>
                                            {userData?.sex ? userData.sex : '-'}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className={classes.property}>
                                <div className={classes.propertyName}>
                                    <span>Возраст</span>
                                </div>
                                <div className={classes.propertyValue}>
                                    {isEditMode ? (
                                        <input
                                            className={classes.input}
                                            placeholder='Значение'
                                            onChange={ageChangeHandler}
                                            value={formData?.age}
                                            type='number'
                                        />
                                    ) : (
                                        <span>
                                            {userData?.age ? userData.age : '-'}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className={classes.property}>
                                <div className={classes.propertyName}>
                                    <span>Место учёбы</span>
                                </div>
                                <div className={classes.propertyValue}>
                                    {isEditMode ? (
                                        <textarea
                                            rows={1}
                                            className={classes.input}
                                            placeholder='Введите значение'
                                            onChange={studyPlaceChangeHandler}
                                            value={formData?.studyPlace}
                                        />
                                    ) : (
                                        <span>
                                            {userData?.studyPlace
                                                ? userData.studyPlace
                                                : '-'}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className={classes.property}>
                                <div className={classes.propertyName}>
                                    <span>Место работы</span>
                                </div>
                                <div className={classes.propertyValue}>
                                    {isEditMode ? (
                                        <textarea
                                            rows={1}
                                            className={classes.input}
                                            placeholder='Введите значение'
                                            onChange={workPlaceChangeHandler}
                                            value={formData?.workPlace}
                                        />
                                    ) : (
                                        <span>
                                            {userData?.workPlace
                                                ? userData.workPlace
                                                : '-'}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className={classes.property}>
                                <div className={classes.propertyName}>
                                    <span>Семейное положение</span>
                                </div>
                                <div className={classes.propertyValue}>
                                    {isEditMode ? (
                                        <textarea
                                            rows={1}
                                            className={classes.input}
                                            placeholder='Введите значение'
                                            onChange={reliationsChangeHandler}
                                            value={formData?.reliations}
                                        />
                                    ) : (
                                        <span>
                                            {userData?.reliations
                                                ? userData.reliations
                                                : '-'}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={classes.wall}>
                {myId === userData?.uid && <CreatePost />}
                <PostsList
                    uid={userData?.uid}
                    avatar={userData?.avatar}
                    name={userData?.name}
                    isMyProfile={myId === userData?.uid}
                />
            </div>
        </div>
    );
};
export default Profile;
