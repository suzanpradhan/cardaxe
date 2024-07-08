'use client';

import type {} from 'ldrs';
import { useEffect } from 'react';

const CircleLoader = () => {
  useEffect(() => {
    async function getLoader() {
      const { ring } = await import('ldrs');
      ring.register();
    }
    getLoader();
  }, []);

  return (
    <l-ring
      size="20"
      stroke="2"
      bg-opacity="0"
      speed="2"
      color="white"
    ></l-ring>
  );
};

export default CircleLoader;
