'use client';
import { RootState } from '@/app/GlobalRedux/store';
import { useUpdateContentsMutation } from '@/app/api/redux/api';
import ButtonForm from '@/components/ButtonForm';
import InputComp from '@/components/InputComp';
import MyCardsContentForm1 from '@/components/myCards/MyCardsContentForm1';
import MyCardsContentForm2 from '@/components/myCards/MyCardsContentForm2';
import MyCardsContentForm3 from '@/components/myCards/MyCardsContentForm3';
import SwitchInput from '@/components/myCards/MyCardsContentSwitch';
import { CardContentType, InputFieldProps } from '@/types/appTypes';
import { camelToSnake } from '@/utils/generalFunctions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import React from 'react';
import { UseFormRegister, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { z } from 'zod';

export type RegisterType = UseFormRegister<{
  prefix: string;
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  bio: string;
  phone: string;
  website: string;
  email: string;
  // isDefault: boolean;
  designation: string;
  department: string;
  company: string;
}>;

const ContentFormSchema = z.object({
  prefix: z.string(),
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  suffix: z.string(),
  bio: z.string(),
  phone: z.string(),
  website: z.string(),
  email: z.string(),
  // isDefault: z.boolean(),
  designation: z.string(),
  department: z.string(),
  company: z.string(),
});

type ContentFormSchemaType = z.infer<typeof ContentFormSchema>;

const page = () => {
  const cardState = useSelector((state: RootState) => state.card);
  const defaultValues = cardState.contentForm;
  const [updateContent] = useUpdateContentsMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContentFormSchemaType>({
    defaultValues,
    resolver: zodResolver(ContentFormSchema),
  });

  const submitData = async () => {
    const newdata = camelToSnake(cardState.contentForm);
    console.log(newdata);
    const id = 1
    await updateContent({id ,...newdata}).then((res) => console.log(res));
    
  };

  // console.log(errors);

  return (
    <form onSubmit={handleSubmit(submitData)} className="flex flex-col gap-4">
      <MyCardsContentForm1 register={register} />
      <MyCardsContentForm2 register={register} />
      <MyCardsContentForm3 register={register} />
      {/* <InputComp
        zSchemaName="isDefault"
        inputCompType="switch"
        inputLabel="Is Default?"
        inputType="checkbox"
        register={register}
      /> */}
      <ButtonForm label="submit" />
    </form>
  );
};

export default page;
