import { get, limitToLast, query, ref } from 'firebase/database';
import React from 'react';
import { database } from '../../firebase';
import { useChat } from '../../hooks/chat-hooks';
import { useAppDispatch, useAppSelector } from '../../hooks/react-redux';

import classes from './Chat.module.scss';
import MessagesList from './messagesList/MessagesList';

const Chat: React.FC = () => {
    const user = useAppSelector((state) => state.userSlice.userData);

    const chat = useChat();

    return (
        <div className={classes.wrapper}>
            <MessagesList loadMore={chat.loadMore} />
        </div>
    );
};
export default Chat;
