'use client';

import MyCardsContentForm1 from '@/components/myCards/MyCardsContentForm1';
import MyCardsContentForm2 from '@/components/myCards/MyCardsContentForm2';
import MyCardsContentForm3 from '@/components/myCards/MyCardsContentForm3';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { useTimeoutDispatch } from '@/hooks/useTimeoutDispatch';
import { updateContentForm, updateErrors } from '@/module/cards/cardSlice';
import cardsApi from '@/module/cards/cardsApi';

// import { useForm } from 'react-hook-form';
import {
  CardState,
  CardTemplatesType,
  ContentFormSchema,
  ContentFormSchemaType,
} from '@/module/cards/cardsType';
import { FormikProps, useFormik } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { ZodError } from 'zod';

const ContentsPage = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const cardState = useSelector((state: RootState) => state.card);
  const cardId = searchParams.get('cardId');
  const cardAction = searchParams.get('action');
  const timeout = useTimeoutDispatch(500);
  const formValuesRef = useRef<FormikProps<ContentFormSchemaType>>(null);

  const card = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getCard-${cardId}`]
        ?.data as CardState<CardTemplatesType>['card']
  );

  useEffect(() => {
    if (cardId) {
      dispatch(cardsApi.endpoints.getCard.initiate(cardId));
    }
  }, [dispatch]);

  const defaultValues = card?.cardFields;
  const fieldPlaceHolder = card?.cardTemplate.defaultCardFields;

  const onSubmit = () => {};

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
    validateOnBlur: true,
    validateOnMount: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    formik.handleChange(name)(value);

    const updatedFormState: CardState<string>['card']['cardFields'] = {
      ...cardState.card.cardFields,
      [name]: value,
    };

    timeout<ContentFormSchemaType>(updateContentForm, updatedFormState);
  };

  const shouldDispatchErrors = useMemo(() => {
    return () =>
      formik.isValid
        ? dispatch(updateErrors(false))
        : dispatch(updateErrors(true));
  }, [formik.isValid, dispatch]);

  useEffect(() => {
    shouldDispatchErrors();

    return () => {};
  }, [shouldDispatchErrors]);

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
        fieldPlaceHolder={fieldPlaceHolder}
      />
      <MyCardsContentForm2
        getFieldProps={formik.getFieldProps}
        handleChange={handleChange}
        values={formik.values}
        errors={formik.errors}
        fieldPlaceHolder={fieldPlaceHolder}
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
