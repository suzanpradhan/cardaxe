import React from 'react';
import FormWrapper from './FormWrapper';
import { z } from 'zod';
import InputComp from '../InputComp';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const MyCardContentForm1Schema = z.object({
  prefix: z.string(),
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  suffix: z.string(),
  bio: z.string(),
});
type MyCardContentForm1SchemaType = z.infer<typeof MyCardContentForm1Schema>;

const INPUT_FEILDS = [
  {
    label: 'Prefix',
    zSchemaName: 'email',
  },
  {
    label: 'First Name',
    zSchemaName: 'firstName',
  },
  {
    label: 'Middle Name',
    zSchemaName: 'middleName',
  },
  {
    label: 'Last Name',
    zSchemaName: 'lastName',
  },
  {
    label: 'Suffix',
    zSchemaName: 'suffix',
  },
  {
    label: 'Bio',
    zSchemaName: 'bio',
  },
];

const MyCardsContentForm1 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MyCardContentForm1SchemaType>({
    resolver: zodResolver(MyCardContentForm1Schema),
  });

  return (
    <FormWrapper>
      <div className="flex flex-col gap-3">
        {INPUT_FEILDS.map((item, index) =>
          item.label !== 'Bio' ? (
            <InputComp
              inputType="text"
              name={item.zSchemaName}
              register={register}
              inputLabel={item.label}
              key={index}
            />
          ) : (
            <div key={index} className="h-28 pb-6">
              <label htmlFor={item.zSchemaName} className="block">
                Bio
              </label>
              <textarea
                id={item.zSchemaName}
                {...register('bio')}
                className="h-full bg-input border-inputBorder border-1 rounded-md w-full"
              />
            </div>
          )
        )}
      </div>
    </FormWrapper>
  );
};

export default MyCardsContentForm1;
