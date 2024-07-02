import "react-toastify/dist/ReactToastify.css";

import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from "react-redux";
import {persistor, store} from '@store/store';
import {PersistGate} from "redux-persist/integration/react";
import ThemeProvider from '@src/theme';
import {ToastContainer, Zoom} from "react-toastify";
import {setupInterceptorsTo} from "@config/configAxios";
import {BrowserRouter} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


import rtlPlugin from 'stylis-plugin-rtl';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import {prefixer} from 'stylis';


import axios from "axios";
import App from './App'

setupInterceptorsTo(axios);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
});


const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <CacheProvider value={cacheRtl}>
                    <ThemeProvider>
                        <ToastContainer
                            position="top-right"
                            transition={Zoom}
                            autoClose={5000}
                            draggable={false}
                            icon={false}
                            closeButton={false}
                            rtl
                            newestOnTop
                            closeOnClick
                            pauseOnFocusLoss
                            hideProgressBar
                        />
                        <BrowserRouter>
                            <QueryClientProvider client={queryClient}>
                                <App/>
                                { import.meta.env.VITE_NODE_ENV === 'development' && (
                                    <ReactQueryDevtools initialIsOpen={false} /> )}
                            </QueryClientProvider>
                        </BrowserRouter>
                    </ThemeProvider>
                </CacheProvider>
            </PersistGate>
        </Provider>


    </React.StrictMode>,
)
