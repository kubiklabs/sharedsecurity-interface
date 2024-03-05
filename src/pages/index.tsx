import React from 'react'
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const index = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/overview');
  }, []);

  return null;
}

export default index