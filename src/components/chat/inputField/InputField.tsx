import EmojiPicker, { IEmojiData } from 'emoji-picker-react';
import { child, push, ref, set, update } from 'firebase/database';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import React, { ChangeEvent, FormEvent, KeyboardEvent, useState } from 'react';
import { database, fireDatabase } from '../../../firebase';
import { useChat } from '../../../hooks/chat-hooks';

import { useAppSelector } from '../../../hooks/react-redux';
import { IMessage } from '../../../types/message';
import classes from './InputField.module.scss';
const InputField: React.FC = () => {
    const [newMessageValue, setNewMessageValue] = useState('');
    const [emojiOpenClass, setEmojiOpenClass] = useState('');
    const user = useAppSelector((state) => state.userSlice.userData);
    const chat = useChat();
    const sendMessage = () => {
        if (newMessageValue.replaceAll('\n', '')) {
            const data: IMessage = {
                uid: user?.uid,
                createdAt: Timestamp.now().seconds,
                text: newMessageValue,
                name: user?.name ? user.name : null,
                avatar: user?.avatar ? user.avatar : null,
            };
            chat.sendMessage(data);

            setNewMessageValue('');
        }
    };
    const textAreaChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNewMessageValue(e.target.value);
    };

    const textAreaOnEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (!e.shiftKey && e.key === 'Enter') {
            sendMessage();
            e.preventDefault();
        }
    };
    const toggleEmoji = () => {
        if (emojiOpenClass) {
            setEmojiOpenClass('');
        } else {
            setEmojiOpenClass(classes.showEmoji);
        }
    };
    const onEmojiPicked = (e: any, data: IEmojiData) => {
        setNewMessageValue((prev) => prev + data.emoji);
    };
    return (
        <div className={classes.wrapper}>
            <div>
                <div className={`${classes.emojiPicker} ${emojiOpenClass}`}>
                    <EmojiPicker onEmojiClick={onEmojiPicked} />
                </div>
            </div>

            <div className={classes.showEmojiButton}>
                <button onClick={toggleEmoji}>😋</button>
            </div>

            <textarea
                placeholder='Введите текст сообщения'
                value={newMessageValue}
                onChange={textAreaChangeHandler}
                onKeyDown={textAreaOnEnter}
            />
            <div className={classes.send}>
                <button onClick={sendMessage}>
                    <span>{'✉'}</span>
                </button>
            </div>
        </div>
    );
};
export default InputField;
