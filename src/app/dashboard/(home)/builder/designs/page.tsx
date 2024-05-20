'use client';

import FormWrapper from '@/components/FormWrapper';
import InputComp from '@/components/InputComp';
import MyCardsDesignForm from '@/components/myCards/MyCardsDesignForm';
import MyCardsDesignSwitch from '@/components/myCards/MyCardsDesignSwitch';
import { useAppDispatch } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { updateDesignForm, updatePublishCard } from '@/module/cards/cardSlice';
import { CardState, DesignFromSchemaType } from '@/module/cards/cardsType';
import { useFormik } from 'formik';
import React, { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';

const Designpage = () => {
  const cardState = useSelector((state: RootState) => state.card);
  const dispatch = useAppDispatch();
  const defaultValues: CardState<string>['card']['cardDesign'] = {
    ...cardState.card.cardDesign,
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value, type, files } = e.target as HTMLInputElement;
    const stateValue =
      type === 'file' && files ? window.URL.createObjectURL(files[0]) : value;

    const updatedFormState: CardState<string>['card']['cardDesign'] = {
      ...cardState.card.cardDesign,
      [name]: stateValue,
    };
    dispatch(updateDesignForm(updatedFormState));
  };

  const handleDefaultChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    dispatch(updatePublishCard(value as unknown as boolean));
  };

  const onSubmit = (data: DesignFromSchemaType) => {};

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
      <FormWrapper>
        <div className="flex flex-col gap-4">
          <InputComp
            zSchemaName="is_default"
            inputCompType="switch"
            inputLabel="Make default"
            inputType="checkbox"
            inputValue={cardState.card.isDefault}
            handleChange={(e) => handleDefaultChange(e)}
            // inputValue={cardState.card.isDefault}
            // error={errors[item.zSchemaName as keyof DesignFromSchemaType]}
            // getFieldProps={getFieldProps}
            // inputValue={values[item.zSchemaName as keyof DesignFromSchemaType]}
          />
        </div>
      </FormWrapper>
    </form>
  );
};

export default Designpage;
