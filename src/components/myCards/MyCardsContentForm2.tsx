import React from 'react';
import FormWrapper from '../FormWrapper';
import { z } from 'zod';
import InputComp from '../InputComp';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputFieldProps } from '@/types/appTypes';
import { RootState } from '@/app/GlobalRedux/store';
import { useSelector } from 'react-redux';
import { RegisterType } from '@/app/dashboard/(home)/builder/contents/page';

const INPUT_FEILDS: InputFieldProps[] = [
  {
    inputLabel: 'Phone',
    zSchemaName: 'phone',
    inputCompType: 'normal',
  },
  {
    inputLabel: 'Website',
    zSchemaName: 'website',
    inputCompType: 'normal',
  },
  {
    inputLabel: 'Email',
    zSchemaName: 'email',
    inputCompType: 'normal',
  },
];

const MyCardsContentForm2 = ({ register }: { register: RegisterType }) => {
  return (
    <FormWrapper>
      <div className="flex flex-col gap-3">
        {INPUT_FEILDS.map((item: InputFieldProps, index: number) => (
          <InputComp
            inputType="text"
            inputCompType={item.inputCompType}
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

export default MyCardsContentForm2;
