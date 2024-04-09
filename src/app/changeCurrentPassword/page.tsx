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
import { apiPaths } from '../../core/api/apiConstants';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Z_SCHEMA_NAME = 'current_password' | 'new_password' | 'new_repassword';

type INPUT_FEILDS_PROPS = {
  placeholder: string;
  type: string;
  zSchemaName: Z_SCHEMA_NAME;
};

const ForgotPasswordSchema = z
  .object({
    current_password: z
      .string()
      .min(8, { message: 'Must be more than 8 characters' })
      .max(24, { message: 'Must be less than 24 characters' }),
    new_password: z
      .string()
      .min(8, { message: 'Must be more than 8 characters' })
      .max(24, { message: 'Must be less than 24 characters' }),
    new_repassword: z
      .string()
      .min(8, { message: 'Must be more than 8 characters' })
      .max(24, { message: 'Must be less than 24 characters' })
      .optional(),
  })
  .refine((data) => data.new_password === data.new_repassword, {
    message: 'Passwords do not match',
    path: ['newRepassword'],
  });

type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;

const INPUT_FEILDS: INPUT_FEILDS_PROPS[] = [
  {
    placeholder: 'Current Password',
    type: 'password',
    zSchemaName: 'current_password',
  },
  {
    placeholder: 'New Password',
    type: 'password',
    zSchemaName: 'new_password',
  },
  {
    placeholder: 'Confirm New Password',
    type: 'password',
    zSchemaName: 'new_repassword',
  },
];

const ChangeCurrentPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const { data: session } = useSession();
  const router = useRouter();

  const submit = async (data: ForgotPasswordSchemaType) => {
    console.log(session?.user?.token);
    axios({
      method: 'post',
      url: `${apiPaths.baseUrl}${apiPaths.changeCurrentPassword}`,
      data: data,
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `JWT ${session?.user?.token}`,
      },
    })
      .then(function () {
        toast.success('Your password has been reset');
        router.push('/dashboard');
      })

      .catch(function (error) {
        console.log(error);
        error.response.data.errors.detail &&
          toast.error(error.response.data.errors.detail);
        error?.response?.data?.errors?.errors[0] &&
          toast.error(error?.response?.data?.errors?.errors[0]);
      });
  };

  return (
    <div className="flex flex-col w-110 mx-auto my-48">
      <FormWrapper
        titleText={true}
        description={
          'Confirm your email, enter new password and confirm it to change.'
        }
      >
        <form
          className="flex flex-col gap-4 pt-2 my-6"
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

export default ChangeCurrentPassword;
