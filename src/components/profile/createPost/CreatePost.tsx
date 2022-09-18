import EmojiPicker, { IEmojiData } from 'emoji-picker-react';
import { child, push, ref, set, update } from 'firebase/database';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import React, { ChangeEvent, FormEvent, KeyboardEvent, useState } from 'react';
import { database, fireDatabase } from '../../../firebase';
import { useChat } from '../../../hooks/chat-hooks';

import { useAppSelector } from '../../../hooks/react-redux';
import { useWall } from '../../../hooks/wall-hooks';
import { IMessage } from '../../../types/message';
import { IPost } from '../../../types/post';
import classes from './CreatePost.module.scss';
const CreatePost: React.FC = () => {
    const [newPostValue, setNewPostValue] = useState('');
    const [emojiOpenClass, setEmojiOpenClass] = useState('');
    const user = useAppSelector((state) => state.userSlice.userData);
    const wall = useWall();
    const limit = useAppSelector((state) => state.profileSlice.limit);
    const sendPost = () => {
        if (newPostValue.replaceAll('\n', '')) {
            const data: IPost = {
                createdAt: Timestamp.now().seconds,
                text: newPostValue,
                id: '',
            };
            wall.sendPost(data);
            if (user?.uid) {
                wall.loadPosts(user.uid, limit);
            }
            setNewPostValue('');
        }
    };
    const textAreaChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNewPostValue(e.target.value);
    };

    const textAreaOnEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (!e.shiftKey && e.key === 'Enter') {
            sendPost();
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
        setNewPostValue((prev) => prev + data.emoji);
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
                placeholder='Введите текст поста'
                value={newPostValue}
                onChange={textAreaChangeHandler}
                onKeyDown={textAreaOnEnter}
            />
            <div className={classes.send}>
                <button onClick={sendPost}>
                    <span>{'✉'}</span>
                </button>
            </div>
        </div>
    );
};
export default CreatePost;
