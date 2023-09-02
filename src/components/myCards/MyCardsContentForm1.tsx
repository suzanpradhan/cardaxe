import React, { useEffect } from 'react';
import FormWrapper from '../FormWrapper';
import { z } from 'zod';
import InputComp from '../InputComp';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RootState } from '@/app/GlobalRedux/store';
import { useSelector } from 'react-redux';
import { InputFieldProps } from '@/types/appTypes';

const MyCardContentForm1Schema = z.object({
  prefix: z.string(),
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  suffix: z.string(),
  bio: z.string(),
});
type MyCardContentForm1SchemaType = z.infer<typeof MyCardContentForm1Schema>;

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

const MyCardsContentForm1 = () => {
  const cardState = useSelector((state: RootState) => state.card);

  const defaultValues = cardState.contentForm;

  const {
    register,
    formState: { errors },
  } = useForm<MyCardContentForm1SchemaType>({
    defaultValues,
    resolver: zodResolver(MyCardContentForm1Schema),
  });

  return (
    <FormWrapper>
      <form className="flex flex-col gap-3">
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
      </form>
    </FormWrapper>
  );
};

export default MyCardsContentForm1;
