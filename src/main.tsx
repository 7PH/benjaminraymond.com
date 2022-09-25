import React from 'react';
import ReactDOM from 'react-dom/client';
import { ParallaxProvider } from 'react-scroll-parallax';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <ParallaxProvider>
            <App />
        </ParallaxProvider>
    </Provider>
);
