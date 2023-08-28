'use client';

import InputComp from '@/components/InputComp';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

type Z_SCHEMA_NAME = 'email' | 'password' | 'confirmPassword';

type INPUT_FEILDS_PROPS = {
  placeholder: string;
  type: string;
  zSchemaName: Z_SCHEMA_NAME;
};

const ForgotPasswordSchema = z
  .object({
    email: z.string().email().trim(),
    password: z
      .string()
      .min(8, { message: 'Must be more than 8 characters' })
      .max(24, { message: 'Must be less than 24 characters' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Must be more than 8 characters' })
      .max(24, { message: 'Must be less than 24 characters' })
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;

const INPUT_FEILDS: INPUT_FEILDS_PROPS[] = [
  {
    placeholder: 'Email',
    type: 'email',
    zSchemaName: 'email',
  },
  {
    placeholder: 'Password',
    type: 'password',
    zSchemaName: 'password',
  },
  {
    placeholder: 'Confirm Password',
    type: 'password',
    zSchemaName: 'confirmPassword',
  },
];

const page = () => {
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
      url: 'http://127.0.0.1:8000/api/user/http://127.0.0.1:8000/api/user/changeCurrentPassword/',
      data: data,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(function (response) {
        toast.success('Your password has been reset');
      })
      .catch(function (AxiosError) {
        const message = AxiosError.response.data.errors.errors[0];
        console.log(message);
        toast.error('Some error occured please wait');
      });
  };

  return (
    <div className="flex flex-col w-110 mx-auto my-48">
      <h1 className="text-4xl font-extrabold ">cardaxe.</h1>
      <p className="pb-">
        Confirm your email, enter new password and confirm it to change.
      </p>
      <form
        className="flex flex-col gap-4 pt-2 w-110 my-6"
        onSubmit={handleSubmit(submit)}
      >
        {INPUT_FEILDS.map((item, index) => (
          <div className="h-12" key={index}>
            <InputComp
              inputType={item.type}
              placeholder={item.placeholder}
              register={register}
              name={item.zSchemaName}
            />
            {errors[item.zSchemaName] && (
              <p className="text-xs text-red-600">
                {errors[item.zSchemaName]?.message}
              </p>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 rounded-md p-2 text-white disabled:bg-inputBorder"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default page;
