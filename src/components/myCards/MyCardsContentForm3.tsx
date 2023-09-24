import React from 'react';
import FormWrapper from '../FormWrapper';

import InputComp from '../InputComp';
import { InputFieldProps } from '@/types/appTypes';
import { CardState } from '@/app/GlobalRedux/Features/cardSlice';

const INPUT_FEILDS: InputFieldProps[] = [
  {
    inputCompType: 'normal',
    inputLabel: 'Title',
    zSchemaName: 'designation',
  },
  {
    inputCompType: 'normal',
    inputLabel: 'Department',
    zSchemaName: 'department',
  },
  {
    inputCompType: 'normal',
    inputLabel: 'Company',
    zSchemaName: 'company',
  },
];

const MyCardsContentForm3 = ({
  register,
}: {
  register: Record<string, any>;
}) => {
  return (
    <FormWrapper>
      <div className="flex flex-col gap-3">
        {INPUT_FEILDS.map((item, index) => (
          <InputComp
            inputType="text"
            zSchemaName={item.zSchemaName}
            register={register}
            inputLabel={item.inputLabel}
            key={index}
            inputCompType={item.inputCompType}
          />
        ))}
      </div>
    </FormWrapper>
  );
};

export default MyCardsContentForm3;
