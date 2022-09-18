import React, { memo, Ref, RefObject, useEffect } from 'react';
import { IMessage } from '../../../../types/message';
import { IUser } from '../../../../types/user';
import classes from './MessageItem.module.scss';
import placeholder from '../../../../static/media/avatar.png';
import { Link } from 'react-router-dom';
import { isImage, isLink } from '../../../../funcs';

interface IProps {
    message: IMessage;
    isMyMessage: boolean;
}

const MessageItem: React.FC<IProps> = ({ message, isMyMessage }) => {
    const date = new Date(message.createdAt ? message.createdAt * 1000 : 0);
    const createdAt =
        date.toLocaleTimeString() + ' ' + date.toLocaleDateString();
    let messageElements = message?.text?.split(' ').map((word, i) => {
        if (isLink(word)) {
            if (isImage(word)) {
                return (
                    <a key={i} href={word} target='blank_'>
                        <>
                            <br />
                            <img
                                src={word}
                                alt='xD'
                                width='250'
                                style={{ borderRadius: '10px' }}
                            />
                            <br />
                        </>
                    </a>
                );
            } else {
                return (
                    <a
                        key={i}
                        href={word.match('http') ? word : `//${word}`}
                        target='blank_'
                        className={classes.link}
                        style={{ textDecoration: 'underline' }}
                    >
                        {word + ' '}
                    </a>
                );
            }
        }
        return <span key={i}>{word + ' '}</span>;
    });

    return (
        <div
            className={`${classes.wrapper} ${
                isMyMessage ? classes.myMessage : ''
            }`}
        >
            <div className={classes.left}>
                <Link to={`../profile/${message.uid}`} className={classes.link}>
                    <img
                        src={message.avatar ? message.avatar : placeholder}
                        alt='avatar'
                    />
                </Link>
            </div>
            <div className={classes.right}>
                <div className={classes.top}>
                    <Link
                        to={`../profile/${message.uid}`}
                        className={classes.link}
                    >
                        <span className={classes.name}>{message.name}</span>
                    </Link>
                    <div className={classes.sendedTime}>
                        <span>{createdAt}</span>
                    </div>
                </div>
                <div className={classes.bottom}>
                    <div className={classes.messageText}>{messageElements}</div>
                </div>
            </div>
        </div>
    );
};

export default MessageItem;
