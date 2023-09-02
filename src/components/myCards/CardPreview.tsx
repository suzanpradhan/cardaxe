import React from 'react';
import CardTemplate from './CardTemplate';
import FormWrapper from '../FormWrapper';
import MobileDesktopSwitch from './MobileDesktopSwitch';

const CardPreview = () => {
  return (
    <div className="shrink basis-full ">
      <FormWrapper>
        <div className="flex flex-col item-center justify-center">
          <MobileDesktopSwitch />
          <CardTemplate />
        </div>
      </FormWrapper>
    </div>
  );
};

export default CardPreview;
