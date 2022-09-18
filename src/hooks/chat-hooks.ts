import {
    child,
    get,
    limitToLast,
    push,
    query,
    ref,
    startAfter,
    update,
} from 'firebase/database';
import { useEffect, useState } from 'react';
import { useList, useListKeys } from 'react-firebase-hooks/database';
import { Logger } from 'sass';
import { database } from '../firebase';
import { increaseLimit, setMessages } from '../store/chatSlice';
import { IMessage } from '../types/message';
import { useAppDispatch, useAppSelector } from './react-redux';

export const useChat = () => {
    const dispatch = useAppDispatch();
    const limit = useAppSelector((state) => state.chatSlice.limit);

    const [serverMessages, messagesLoading, error] = useListKeys(
        query(ref(database, 'messages'), limitToLast(1))
    );

    useEffect(() => {
        get(query(ref(database, 'messages'), limitToLast(limit))).then((res) =>
            dispatch(setMessages(Object.values(res.val())))
        );
    }, [serverMessages, messagesLoading, dispatch, limit]);

    return {
        loadMore() {
            dispatch(increaseLimit());
        },
        sendMessage(data: IMessage) {
            interface update {
                [key: string]: IMessage;
            }

            const newMessageKey = push(child(ref(database), 'messages')).key;
            const updates: update = {};

            updates[`/messages/${newMessageKey}`] = data;
            update(ref(database), updates);
        },
    };
};
