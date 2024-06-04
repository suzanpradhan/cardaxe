'use client';

import ButtonForm from '@/components/ButtonForm';
import FormWrapper from '@/components/FormWrapper';
import InputComp from '@/components/InputComp';
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
        console.log(responseData);
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
  // const submit = async (data: ConfirmEmailSchemaType) => {
  //   axios({
  //     method: 'post',
  //     url: `${apiPaths.baseUrl}${apiPaths.sendForgotPasswordEmail}`,
  //     data: data,
  //     headers: { 'Content-Type': 'multipart/form-data' },
  //   })
  //     .then((response) => {
  //       console.log(response);
  //       toast.info(response.data.msg);
  //       setDisableInput(true);
  //     })
  //     .catch((AxiosError) => {
  //       const message = AxiosError.response.data.errors.errors[0];
  //       console.log(message);
  //       toast.error(message);
  //     });
  // };
  return (
    <div className="flex flex-col w-140 mx-auto my-48">
      <FormWrapper
        titleText={true}
        description={'Please enter the registered verified email id.'}
      >
        <form
          className="flex flex-col gap-4 pt-2 my-6"
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
