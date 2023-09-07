import React, { useEffect } from 'react';
import FormWrapper from '../FormWrapper';
import { z } from 'zod';
import InputComp from '../InputComp';
import { InputFieldProps } from '@/types/appTypes';
import { RegisterType } from '@/app/dashboard/(home)/builder/contents/page';

const INPUT_FEILDS: InputFieldProps[] = [
  {
    inputCompType: 'normal',
    inputLabel: 'Prefix',
    zSchemaName: 'prefix',
  },
  {
    inputCompType: 'normal',
    inputLabel: 'First Name',
    zSchemaName: 'firstName',
  },
  {
    inputCompType: 'normal',
    inputLabel: 'Middle Name',
    zSchemaName: 'middleName',
  },
  {
    inputCompType: 'normal',
    inputLabel: 'Last Name',
    zSchemaName: 'lastName',
  },
  {
    inputCompType: 'normal',
    inputLabel: 'Suffix',
    zSchemaName: 'suffix',
  },
  {
    inputCompType: 'textArea',
    inputLabel: 'Bio',
    zSchemaName: 'bio',
  },
];

const MyCardsContentForm1 = ({ register }: { register: RegisterType }) => {
  return (
    <FormWrapper>
      <div className="flex flex-col gap-3">
        {INPUT_FEILDS.map((item: InputFieldProps, index: number) => (
          <InputComp
            inputCompType={item.inputCompType}
            inputType="text"
            zSchemaName={item.zSchemaName}
            register={register}
            inputLabel={item.inputLabel}
            key={index}
          />
        ))}
      </div>
    </FormWrapper>
  );
};

export default MyCardsContentForm1;
