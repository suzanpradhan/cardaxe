'use client';

import ButtonForm from '@/components/ButtonForm';
import FormWrapper from '@/components/FormWrapper';
import InputComp from '@/components/Inputs/InputComp';
import { useAppDispatch } from '@/core/redux/clientStore';
import { registerApi } from '@/module/register/registerApi';
import {
  ConfirmEmailSchema,
  ConfirmEmailSchemaType,
} from '@/module/register/registerType';
import { useFormik } from 'formik';
import { useState } from 'react';
import { ZodError } from 'zod';

const ConfirmEmail = () => {
  const [disableInput, setDisableInput] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const validateForm = (values: ConfirmEmailSchemaType) => {
    try {
      ConfirmEmailSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        return error.formErrors.fieldErrors;
      }
    }
  };

  const onSubmit = async (data: ConfirmEmailSchemaType) => {
    try {
      const responseData = await dispatch(
        registerApi.endpoints.confirmEmail.initiate({
          email: data.email,
        })
      );
      if (Object.prototype.hasOwnProperty.call(responseData, 'error')) {
        console.log('regsister response', responseData);
      } else if (Object.prototype.hasOwnProperty.call(responseData, 'data')) {
        setDisableInput(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik<ConfirmEmailSchemaType>({
    enableReinitialize: true,
    initialValues: {
      email: '',
    },
    validateOnChange: true,
    onSubmit,
    validate: validateForm,
    validateOnBlur: true,
  });
  return (
    <div className="mx-auto my-48 flex w-140 flex-col">
      <FormWrapper
        titleText={true}
        description={'Please enter the registered verified email id.'}
      >
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit(e);
          }}
        >
          <div className="h-12">
            <InputComp
              inputType="email"
              inputValue={formik.values.email}
              placeholder="Registered Email"
              getFieldProps={formik.getFieldProps}
              zSchemaName={'email'}
            />
            {formik.errors.email && (
              <p className="text-xs text-redError">{formik.errors.email}</p>
            )}
          </div>

          <ButtonForm label="Send Email" disableInput={disableInput} />
        </form>
      </FormWrapper>
    </div>
  );
};

export default ConfirmEmail;
