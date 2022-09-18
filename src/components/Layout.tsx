import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Chat from './chat/Chat';
import Content from './content/Content';
import Header from './header/Header';

const Layout: React.FC = () => {
    return (
        <>
            <Header />
            <Content />
        </>
    );
};
export default Layout;
