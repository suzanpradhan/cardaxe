'use client';

import ButtonForm from '@/components/ButtonForm';
import InputComp from '@/components/InputComp';
import FormWrapper from '@/components/FormWrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { apiPaths } from '../../core/api/apiConstants';

const ForgotPasswordSchema = z.object({
  email: z.string().email().trim(),
});

type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;

const ConfirmEmail = () => {
  const [disableInput, setDisableInput] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const submit = async (data: ForgotPasswordSchemaType) => {
    axios({
      method: 'post',
      url: `${apiPaths.baseUrl}${apiPaths.sendForgotPasswordEmail}`,
      data: data,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((response) => {
        console.log(response);
        toast.info(response.data.msg);
        setDisableInput(true);
      })
      .catch((AxiosError) => {
        const message = AxiosError.response.data.errors.errors[0];
        console.log(message);
        toast.error(message);
      });
  };
  return (
    <div className="flex flex-col w-140 mx-auto my-48">
      <FormWrapper
        titleText={true}
        description={'Please enter the registered verified email id.'}
      >
        <form
          className="flex flex-col gap-4 pt-2"
          onSubmit={handleSubmit(submit)}
        >
          <div className="h-12">
            <InputComp
              inputType="email"
              placeholder="Registered Email"
              register={register}
              zSchemaName="email"
              disableInput={disableInput}
            />
            {errors.email && (
              <p className="text-xs text-redError">{errors.email?.message}</p>
            )}
          </div>
          <ButtonForm label="Send Email" disableInput={disableInput} />
        </form>
      </FormWrapper>
    </div>
  );
};

export default ConfirmEmail;
