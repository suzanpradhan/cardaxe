'use client';

import MyCardsDesignForm from '@/components/myCards/MyCardsDesignForm';
import MyCardsDesignSwitch from '@/components/myCards/MyCardsDesignSwitch';
import React from 'react';

const Designpage = () => {
  return (
    <div className="flex gap-4 flex-col">
      <MyCardsDesignForm />
      <MyCardsDesignSwitch />
    </div>
  );
};

export default Designpage;
