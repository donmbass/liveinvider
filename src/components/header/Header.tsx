import React from 'react';
import classes from './Header.module.scss';
import Menu from './menu/Menu';
import logo from '../../static/media/logo.png';
import { useAppDispatch, useAppSelector } from '../../hooks/react-redux';
import { logOut, setUser } from '../../store/userSlice';
import { Link } from 'react-router-dom';
import MicroProfile from './microProfile/MicroProfile';

const Header: React.FC = () => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector((state) => state.userSlice.authData.isAuth);
    const logout = () => {
        dispatch(logOut());
        localStorage.removeItem('token');
        localStorage.removeItem('uid');
    };
    return (
        <div className={classes.wrapper}>
            <div className={classes.logo}>
                <Link to='../users' className={classes.link}>
                    <img src={logo} alt='' />
                </Link>
            </div>
            <Menu />
            <div className={classes.login}>
                {isAuth ? (
                    <>
                        <MicroProfile />
                        <button
                            onClick={logout}
                            className={classes.logoutButton}
                        >
                            <span>✖</span>
                        </button>
                    </>
                ) : (
                    <Link to='login' className={classes.loginButton}>
                        Войти
                    </Link>
                )}
            </div>
        </div>
    );
};
export default Header;
