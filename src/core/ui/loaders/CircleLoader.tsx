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
    <div className="mt-2">
      <l-ring
        size="28"
        stroke="2"
        bg-opacity="0"
        speed="2"
        color="white"
      ></l-ring>
    </div>
  );
};

export default CircleLoader;
