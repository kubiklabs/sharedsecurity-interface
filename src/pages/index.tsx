/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import BrowserTitle from '@/components/BrowserTitle/BrowserTitle';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/overview');
  }, []);

  return (
    <>
      <BrowserTitle title="Shared Security" />
    </>
  )
};

export default Index