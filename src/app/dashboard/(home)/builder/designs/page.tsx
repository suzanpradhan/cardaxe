'use client';

import { updateDesignForm } from '@/app/GlobalRedux/Features/cardSlice';
import MyCardsDesignForm from '@/components/myCards/MyCardsDesignForm';
import MyCardsDesignSwitch from '@/components/myCards/MyCardsDesignSwitch';
import { useAppDispatch } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { CardState, DesignFromSchemaType } from '@/module/cards/cardsType';
import { useFormik } from 'formik';
import React, { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';

const Designpage = () => {
  const cardState = useSelector((state: RootState) => state.card);
  const dispatch = useAppDispatch();
  const defaultValues: CardState['card']['cardDesign'] = {
    ...cardState.card.cardDesign,
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value, type, files } = e.target as HTMLInputElement;

    const stateValue =
      type === 'file' && files ? window.URL.createObjectURL(files[0]) : value;

    console.log(stateValue);
    const updatedFormState: CardState['card']['cardDesign'] = {
      ...cardState.card.cardDesign,
      [name]: stateValue,
    };
    dispatch(updateDesignForm(updatedFormState));
  };

  const onSubmit = (data: DesignFromSchemaType) => {
    console.log(data);
  };

  const formik = useFormik<DesignFromSchemaType>({
    enableReinitialize: true,
    initialValues: { ...defaultValues },
    validateOnChange: true,
    onSubmit,
  });

  return (
    <form
      className="flex gap-4 flex-col "
      onSubmit={(e) => {
        e.preventDefault();
        console.log(e.target);
        formik.handleSubmit(e);
      }}
    >
      <MyCardsDesignForm
        errors={formik.errors}
        getFieldProps={formik.getFieldProps}
        handleChange={handleChange}
        values={formik.values}
      />
      <MyCardsDesignSwitch
        errors={formik.errors}
        getFieldProps={formik.getFieldProps}
        handleChange={handleChange}
        values={formik.values}
      />
    </form>
  );
};

export default Designpage;
