import React from 'react';
import classes from './MicroProfile.module.scss';
import placeholder from '../../../static/media/avatar.png';
import { useAppSelector } from '../../../hooks/react-redux';
import { Link } from 'react-router-dom';

const MicroProfile: React.FC = () => {
    const user = useAppSelector((state) => state.userSlice.userData);
    return (
        <Link to={`../profile/${user?.uid}`} className={classes.link}>
            <div className={classes.wrapper}>
                <div className={classes.left}>
                    <img
                        src={user?.avatar ? user.avatar : placeholder}
                        alt='avatar'
                    />
                </div>
                <div className={classes.right}>
                    <span>{user?.name}</span>
                </div>
            </div>
        </Link>
    );
};
export default MicroProfile;
