import React from 'react';
import FormWrapper from '../FormWrapper';
import InputComp from '../InputComp';
import { InputFieldProps } from '@/core/types/appTypes';
import { CardState } from '@/modules/card/cardReducer';

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

const MyCardsContentForm1 = ({
  register,
}: {
  register: Record<string, any>;
}) => {
  const selectOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

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
        <InputComp
          zSchemaName="none"
          inputCompType="select"
          options={selectOptions}
          inputLabel="Tags"
        />
      </div>
    </FormWrapper>
  );
};

export default MyCardsContentForm1;
