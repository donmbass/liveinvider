import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Menu.module.scss';

const Menu: React.FC = () => {
    return (
        <div className={classes.wrapper}>
            <ul>
                <li>
                    <Link className={classes.link} to='chat'>
                        Перейти в чат
                    </Link>{' '}
                </li>
                {/* <li>
                    <Link className={classes.link} to='profile'>
                        Профиль
                    </Link>
                </li> */}
            </ul>
        </div>
    );
};
export default Menu;
