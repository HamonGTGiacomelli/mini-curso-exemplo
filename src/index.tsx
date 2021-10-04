import React from 'react';
import ReactDOM from 'react-dom';
import Home from './pages/Home';
import './index.scss';
import Header from './components/Header';

ReactDOM.render(
    <React.StrictMode>
        <Header />
        <Home />
    </React.StrictMode>,
    document.getElementById('root'),
);
