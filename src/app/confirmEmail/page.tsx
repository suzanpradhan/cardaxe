'use client';

import ButtonForm from '@/components/ButtonForm';
import InputComp from '@/components/InputComp';
import FormWrapper from '@/components/FormWrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

const ForgotPasswordSchema = z.object({
  email: z.string().email().trim(),
});

type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;

const page = () => {
  const [disableInput, setDisableInput] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const router = useRouter();

  const submit = async (data: ForgotPasswordSchemaType) => {
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/user/send-forgot-password-email/',
      data: data,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(function (response) {
        toast.info('You will be redirected via email.');
        setDisableInput(true);
      })
      .catch(function (AxiosError) {
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
              name="email"
              disableInput={disableInput}
            />
            {errors.email && (
              <p className="text-xs text-red-600">{errors.email?.message}</p>
            )}
          </div>
          <ButtonForm label="Send Email" disableInput={disableInput} />
        </form>
      </FormWrapper>
    </div>
  );
};

export default page;
