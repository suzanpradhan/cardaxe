import React from 'react';
import CardTemplate from './CardTemplate';
import FormWrapper from '../FormWrapper';
import MobileDesktopSwitch from './MobileDesktopSwitch';
import ProfileDetails from './ProfileDetails';

const PreviewSection = () => {
  return (
    <div className="basis-1/2">
      <FormWrapper>
        <div className="grid justify-center">
          <MobileDesktopSwitch />
          <div className="object-contain my-4">
            <CardTemplate />
          </div>
          <ProfileDetails />
        </div>
      </FormWrapper>
    </div>
  );
};

export default PreviewSection;
