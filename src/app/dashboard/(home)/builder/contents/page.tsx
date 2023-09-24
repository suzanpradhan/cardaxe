'use client';
import { RootState } from '@/app/GlobalRedux/store';
import { useUpdateContentsMutation } from '@/app/api/redux/api';
import ButtonForm from '@/components/ButtonForm';
import MyCardsContentForm1 from '@/components/myCards/MyCardsContentForm1';
import MyCardsContentForm2 from '@/components/myCards/MyCardsContentForm2';
import MyCardsContentForm3 from '@/components/myCards/MyCardsContentForm3';
import { camelToSnake } from '@/utils/generalFunctions';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { z } from 'zod';

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

const ContentsPage = () => {
  const cardState = useSelector((state: RootState) => state.card);
  const defaultValues = cardState.contentForm;
  const [updateContent] = useUpdateContentsMutation();
  const { register, handleSubmit } = useForm<ContentFormSchemaType>({
    defaultValues,
    resolver: zodResolver(ContentFormSchema),
  });

  const submitData = async () => {
    const newdata = camelToSnake(cardState.contentForm);
    console.log(newdata);
    const id = 1;
    await updateContent({ id, ...newdata })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  // console.log(errors);

  return (
    <form onSubmit={handleSubmit(submitData)} className="flex flex-col gap-4">
      <MyCardsContentForm1 register={register} />
      <MyCardsContentForm2 register={register} />
      <MyCardsContentForm3 register={register} />
      <ButtonForm label="submit" />
    </form>
  );
};

export default ContentsPage;
