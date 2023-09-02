'use client';

import CardPreview from '@/components/myCards/CardPreview';
import MyCardsDesignForm from '@/components/myCards/MyCardsDesignForm';
import MyCardsDesignSwitch from '@/components/myCards/MyCardsDesignSwitch';
import React from 'react';

const page = () => {
  return (
    <div className="flex gap-6 ">
      <div>
        <MyCardsDesignForm />
        <MyCardsDesignSwitch />
      </div>
      <CardPreview />
    </div>
  );
};

export default page;
