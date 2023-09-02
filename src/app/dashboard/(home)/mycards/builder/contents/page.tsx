'use client';
import CardPreview from '@/components/myCards/CardPreview';
import MyCardsContentForm1 from '@/components/myCards/MyCardsContentForm1';
import MyCardsContentForm2 from '@/components/myCards/MyCardsContentForm2';
import MyCardsContentForm3 from '@/components/myCards/MyCardsContentForm3';
import SwitchInput from '@/components/myCards/MyCardsContentSwitch';
import React from 'react';

const page = () => {
  return (
    <div className="flex gap-6 ">
      <div className="basis-110 shrink flex flex-col gap-4">
        <MyCardsContentForm1 />
        <MyCardsContentForm2 />
        <MyCardsContentForm3 />
        <SwitchInput label="Set default" />
      </div>
      <CardPreview />
    </div>
  );
};

export default page;
