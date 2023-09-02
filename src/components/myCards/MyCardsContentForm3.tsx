import React from 'react';
import FormWrapper from '../FormWrapper';
import { z } from 'zod';
import InputComp from '../InputComp';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputFieldProps } from '@/types/appTypes';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';

const MyCardContentFormSchema = z.object({
  phone: z.string(),
  department: z.string(),
  company: z.string(),
});
type MyCardContentFormSchemaType = z.infer<typeof MyCardContentFormSchema>;

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

const MyCardsContentForm3 = () => {
  const cardState = useSelector((state: RootState) => state.card);

  const defaultValues = cardState.contentForm;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MyCardContentFormSchemaType>({
    defaultValues,
    resolver: zodResolver(MyCardContentFormSchema),
  });

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
