import React, { useEffect } from 'react';
import type { AppProps } from "next/app";
import { RecoilRoot } from 'recoil';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Layout from '@/layout';
import '@/styles/globals.css';
import '@/styles/index.css'
import { ToastContainer } from 'react-toastify';
import { useConnectWallet } from '@/hooks/useConnectWallet';
import "react-toastify/dist/ReactToastify.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
    const connectWallet = useConnectWallet();

    useEffect(() => {
        if (connectWallet)
            connectWallet();
    }, []);

    window.addEventListener("keplr_keystorechange", () => {
        if (connectWallet)
            connectWallet();
    });

    return (
        <RecoilRoot>
            <ChakraProvider theme={theme}>
                <Layout>
                    <Component {...pageProps} />
                    <ToastContainer/>
                </Layout>
            </ChakraProvider>
        </RecoilRoot>
    );
};

export default MyApp;
