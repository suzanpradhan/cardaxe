'use client';

import ButtonForm from '@/components/ButtonForm';
import InputComp from '@/components/InputComp';
import FormWrapper from '@/components/FormWrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { useParams, useRouter } from 'next/navigation';
import { apiPaths } from '@/app/api/apiConstants';

type Z_SCHEMA_NAME = 'password' | 'password2';

type INPUT_FEILDS_PROPS = {
  placeholder: string;
  type: string;
  zSchemaName: Z_SCHEMA_NAME;
};

const ForgotPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Must be more than 8 characters' })
      .max(24, { message: 'Must be less than 24 characters' }),
    password2: z
      .string()
      .min(8, { message: 'Must be more than 8 characters' })
      .max(24, { message: 'Must be less than 24 characters' })
      .optional(),
  })
  .refine((data) => data.password === data.password2, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;

const INPUT_FEILDS: INPUT_FEILDS_PROPS[] = [
  {
    placeholder: 'Password',
    type: 'password',
    zSchemaName: 'password',
  },
  {
    placeholder: 'Confirm Password',
    type: 'password',
    zSchemaName: 'password2',
  },
];

const ResetPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(ForgotPasswordSchema),
  });
  const params = useParams();
  const router = useRouter();

  const submit = async (data: ForgotPasswordSchemaType) => {
    axios({
      method: 'post',
      url: `${apiPaths.baseUrl}${apiPaths.resetPassword}${params.uid}/${params.token}/`,
      data: data,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(function () {
        toast.success('Your password has been reset');
        router.push('/login');
      })
      .catch(function (error) {
        console.error(error.message);
        toast.error(error.message);
      });
  };

  return (
    <div className="flex flex-col w-110 mx-auto my-48">
      <FormWrapper
        titleText={true}
        description={'Enter new password and confirm it to change.'}
      >
        <form
          className="flex flex-col gap-4 pt-2  "
          onSubmit={handleSubmit(submit)}
        >
          {INPUT_FEILDS.map((item, index) => (
            <div className="h-12" key={index}>
              <InputComp
                inputType={item.type}
                placeholder={item.placeholder}
                register={register}
                zSchemaName={item.zSchemaName}
              />
              {errors[item.zSchemaName] && (
                <p className="text-xs text-redError">
                  {errors[item.zSchemaName]?.message}
                </p>
              )}
            </div>
          ))}
          <ButtonForm label="Reset Password" />
        </form>
      </FormWrapper>
    </div>
  );
};

export default ResetPage;
