'use client';
import { RootState } from '@/core/redux/store';
import ButtonForm from '@/components/ButtonForm';
import MyCardsContentForm1 from '@/components/myCards/MyCardsContentForm1';
import MyCardsContentForm2 from '@/components/myCards/MyCardsContentForm2';
import MyCardsContentForm3 from '@/components/myCards/MyCardsContentForm3';
import { camelToSnake } from '@/core/utils/generalFunctions';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { use } from 'react';
// import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { z } from 'zod';
import { useFormik } from 'formik';
import { ContentFormSchemaType } from '@/module/cards/cardsType';

const ContentsPage = () => {
  const cardState = useSelector((state: RootState) => state.card);
  const defaultValues = cardState.contentForm;
  // const [updateContent] = useUpdateContentsMutation();
  // const { register, handleSubmit } = useForm<ContentFormSchemaType>({
  //   defaultValues,
  //   resolver: zodResolver(ContentFormSchema),
  // });

  const onSubmit = (values: ContentFormSchemaType) => { console.log(values)}
  const formik = useFormik<ContentFormSchemaType>({
    enableReinitialize: true,
    initialValues: {id:1, ...defaultValues},
    validateOnChange: false,
    onSubmit,
  })

  // const submitData = async () => {
  //   const newdata = camelToSnake(cardState.contentForm);
  //   console.log(newdata);
  //   const id = 1;
  //   await updateContent({ id, ...newdata })
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // };

  // console.log(errors);

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      console.log(e.target);
      formik.handleSubmit(e);
    }} className="flex flex-col gap-4">
      {/* <MyCardsContentForm1 register={register} />
      <MyCardsContentForm2 register={register} />
      <MyCardsContentForm3 register={register} /> */}
      <ButtonForm label="submit"/>
    </form>
  );
};

export default ContentsPage;
