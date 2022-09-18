import { doc, getDoc } from 'firebase/firestore';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Comment } from 'react-loader-spinner';

import { useAppDispatch, useAppSelector } from '../../../hooks/react-redux';

import MessageItem from './messageItem/MessageItem';
import classes from './MessagesList.module.scss';
interface IProps {
    loadMore: () => void;
}
const MessagesList: React.FC<IProps> = ({ loadMore }) => {
    const dispatch = useAppDispatch();
    const chatState = useAppSelector((state) => state.chatSlice);
    const messages = chatState.messages;
    const isAllLoaded = chatState.isAllLoaded;
    const user = useAppSelector((state) => state.userSlice.userData);

    if (messages) {
        return (
            <div id='scrollableDiv' className={classes.wrapper}>
                <InfiniteScroll
                    dataLength={messages.length}
                    next={loadMore}
                    className={classes.scroll}
                    inverse={true}
                    hasMore={!isAllLoaded}
                    loader={
                        <div className={classes.loaderMain}>
                            <Comment
                                height='50'
                                width='50'
                                ariaLabel='comment-loading'
                                wrapperClass='comment-wrapper'
                                color='#fff'
                                backgroundColor='#B90101'
                            />
                        </div>
                    }
                    scrollableTarget='scrollableDiv'
                    endMessage={
                        <span style={{ textAlign: 'center' }}>
                            Сообщений больше нет
                        </span>
                    }
                >
                    {messages.map((message, i) => (
                        <MessageItem
                            message={message}
                            isMyMessage={message.uid === user?.uid}
                            key={i}
                        />
                    ))}
                </InfiniteScroll>
            </div>
        );
    }
    return (
        <div className={classes.loaderMessages}>
            <Comment
                height='90'
                width='90'
                ariaLabel='comment-loading'
                wrapperClass='comment-wrapper'
                color='#fff'
                backgroundColor='#B90101'
            />
        </div>
    );
};
export default MessagesList;
