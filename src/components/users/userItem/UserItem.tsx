import React from 'react';
import { IShortUser } from '../../../types/user';
import classes from './UserItem.module.scss';
import placeholder from '../../../static/media/avatar.png';
import { Link } from 'react-router-dom';

interface IProps {
    user: IShortUser;
}

const UserItem: React.FC<IProps> = ({ user }) => {
    return (
        <Link to={`../profile/${user.uid}`} className={classes.wrapper}>
            <div className={classes.left}>
                <img
                    src={user?.avatar ? user.avatar : placeholder}
                    alt='avatar'
                />
            </div>
            <div className={classes.right}>
                <span>{user.name}</span>
            </div>
        </Link>
    );
};

export default UserItem;
