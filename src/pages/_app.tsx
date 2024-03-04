import React from 'react';
import type { AppProps } from "next/app";
import { RecoilRoot } from 'recoil';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Layout from '@/layout';
import '@/styles/globals.css';
import '@/styles/index.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <RecoilRoot>
            <ChakraProvider theme={theme}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ChakraProvider>
        </RecoilRoot>
    );
};

export default MyApp;
