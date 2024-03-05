import React from 'react'
import Head from 'next/head';

const BrowserTitle = ({title="Shared Security"}: {title?: string}) => {
    return (
        <Head>
            <title>{title}</title>
        </Head>
    )
}

export default BrowserTitle