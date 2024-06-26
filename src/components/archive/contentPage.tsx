// 'use client';
// import {
//   updateContentForm,
//   updateErrors,
// } from '@/app/GlobalRedux/Features/cardSlice';
// import ButtonForm from '@/components/ButtonForm';
// import MyCardsContentForm1 from '@/components/myCards/MyCardsContentForm1';
// import MyCardsContentForm2 from '@/components/myCards/MyCardsContentForm2';
// import MyCardsContentForm3 from '@/components/myCards/MyCardsContentForm3';
// import { useAppDispatch } from '@/core/redux/clientStore';
// import { RootState } from '@/core/redux/store';
// import cardsApi from '@/module/cards/cardsApi';

// // import { useForm } from 'react-hook-form';
// import {
//   CardState,
//   ContentFormSchema,
//   ContentFormSchemaType,
// } from '@/module/cards/cardsType';
// import { useFormik } from 'formik';
// import { ChangeEvent } from 'react';
// import { useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
// import { ZodError } from 'zod';

// const ContentsPage = () => {
//   const dispatch = useAppDispatch();
//   const cardState = useSelector((state: RootState) => state.card);
//   const defaultValues = cardState.card.cardFields;
//   // const { register, handleSubmit } = useForm<ContentFormSchemaType>({
//   //   defaultValues,
//   //   resolver: zodResolver(ContentFormSchema),
//   // });

//   const onSubmit = (values: ContentFormSchemaType) => {
//     const submitresponse = dispatch(
//       cardsApi.endpoints.updateContents.initiate(values)
//     );
//     submitresponse
//       .then((res) => toast.success('Submitted Successfulluy'))
//       .catch((err) => {
//         toast.error('Something went wrong');
//         throw err;
//       });
//   };
//   const validateForm = (values: ContentFormSchemaType) => {
//     try {
//       ContentFormSchema.parse(values);
//     } catch (error) {
//       if (error instanceof ZodError) {
//         console.log(error);

//         return error.formErrors.fieldErrors;
//       }
//     }
//   };
//   const formik = useFormik<ContentFormSchemaType>({
//     // enableReinitialize: true,
//     initialValues: { id: 1, ...defaultValues },
//     // validateOnChange: true,
//     onSubmit,
//     validate: validateForm,
//     // validate: toFormikValidate(ContentFormSchema),
//     // validateOnBlur: true,
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;

//     const updatedFormState: CardState['contentForm'] = {
//       ...cardState.card.cardFields,
//       [name]: value,
//     };

//     if (
//       formik.errors['name' as keyof CardState['card']['cardFields']] === null
//     ) {
//       dispatch(updateContentForm(updatedFormState));
//     } else {
//       dispatch(updateErrors({ e }));
//     }
//   };

//   return (
//     <form
//       onSubmit={(e) => {
//         e.preventDefault();
//         formik.handleSubmit(e);
//       }}
//       className="flex flex-col gap-4"
//     >
//       <MyCardsContentForm1
//         getFieldProps={formik.getFieldProps}
//         handleChange={handleChange}
//         values={formik.values}
//         errors={formik.errors}
//       />
//       <MyCardsContentForm2
//         getFieldProps={formik.getFieldProps}
//         handleChange={handleChange}
//         values={formik.values}
//         errors={formik.errors}
//       />
//       <MyCardsContentForm3
//         getFieldProps={formik.getFieldProps}
//         handleChange={handleChange}
//         values={formik.values}
//         errors={formik.errors}
//       />
//       <ButtonForm label="submit" />
//     </form>
//   );
// };

// export default ContentsPage;
