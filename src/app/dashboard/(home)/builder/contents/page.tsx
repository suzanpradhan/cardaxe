'use client';

import MyCardsContentForm1 from '@/components/myCards/MyCardsContentForm1';
import MyCardsContentForm2 from '@/components/myCards/MyCardsContentForm2';
import MyCardsContentForm3 from '@/components/myCards/MyCardsContentForm3';
import { useAppDispatch } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { updateContentForm, updateErrors } from '@/module/cards/cardSlice';
import cardsApi from '@/module/cards/cardsApi';

// import { useForm } from 'react-hook-form';
import {
  CardState,
  ContentFormSchema,
  ContentFormSchemaType,
} from '@/module/cards/cardsType';
import { useFormik } from 'formik';
import { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ZodError } from 'zod';

const ContentsPage = () => {
  const dispatch = useAppDispatch();
  const cardState = useSelector((state: RootState) => state.card);
  const defaultValues = cardState.card.cardFields;
  // const { register, handleSubmit } = useForm<ContentFormSchemaType>({
  //   defaultValues,
  //   resolver: zodResolver(ContentFormSchema),
  // });

  const onSubmit = (values: ContentFormSchemaType) => {
    const submitresponse = dispatch(
      cardsApi.endpoints.updateContents.initiate(values)
    );
    submitresponse
      .then((res) => toast.success('Submitted Successfulluy'))
      .catch((err) => {
        toast.error('Something went wrong');
        throw err;
      });
  };
  const validateForm = (values: ContentFormSchemaType) => {
    try {
      ContentFormSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        return error.formErrors.fieldErrors;
      }
    }
  };
  const formik = useFormik<ContentFormSchemaType>({
    enableReinitialize: true,
    initialValues: { id: 1, ...defaultValues },
    validateOnChange: true,
    onSubmit,
    validate: validateForm,
    // validate: toFormikValidate(ContentFormSchema),
    validateOnBlur: true,
    validateOnMount: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    const updatedFormState: CardState['card']['cardFields'] = {
      ...cardState.card.cardFields,
      [name]: value,
    };

    dispatch(updateContentForm(updatedFormState));
    if (
      formik.errors[name as keyof CardState['card']['cardFields']] == undefined
    ) {
      dispatch(updateErrors(false));
    } else {
      dispatch(updateErrors(true));
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit(e);
      }}
      className="flex flex-col gap-4"
    >
      <MyCardsContentForm1
        getFieldProps={formik.getFieldProps}
        handleChange={handleChange}
        values={formik.values}
        errors={formik.errors}
      />
      <MyCardsContentForm2
        getFieldProps={formik.getFieldProps}
        handleChange={handleChange}
        values={formik.values}
        errors={formik.errors}
      />
      <MyCardsContentForm3
        getFieldProps={formik.getFieldProps}
        handleChange={handleChange}
        values={formik.values}
        errors={formik.errors}
      />
    </form>
  );
};

export default ContentsPage;
