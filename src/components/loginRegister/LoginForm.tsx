'use client';

import { useAppDispatch } from '@/core/redux/clientStore';
import { LoginSchemaType, loginSchema } from '@/module/login/loginType';
import userApi from '@/module/user/userApi';
import { useMutation } from 'convex/react';
import { useFormik } from 'formik';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { toFormikValidate } from 'zod-formik-adapter';
import { api } from '../../../convex/_generated/api';
import ButtonForm from '../ButtonForm';
import FormWrapper from '../FormWrapper';
import InputComp from '../Inputs/InputComp';

type zSchemaName = 'email' | 'password';

type LoginFeildProps = {
  placeholder: string;
  type: string;
  zSchemaName: zSchemaName;
};

const LOGIN_FEILDS: LoginFeildProps[] = [
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
];

const LoginForm: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const saveUser = useMutation(api.rooms.saveUser);

  const callback = searchParams.get('callback');

  const onSubmit = async (data: LoginSchemaType) => {
    setIsLoading(true);
    await signIn('credentials', {
      email: data.email.toLowerCase(),
      password: data.password,
      // callbackUrl: callback!,
      redirect: false,
    })
      .then(async (response) => {
        if (!response?.error) {
          await dispatch(userApi.endpoints.getUser.initiate())
            .then((userResponse) => {
              if ((userResponse as any).data) {
                saveUser({
                  avatar: userResponse.data!.avatar ?? undefined,
                  email: userResponse.data!.email,
                  name: userResponse.data!.fullname,
                  uuid: userResponse.data!.id.toString(),
                });
                router.replace(callback ?? '/dashboard');
              } else {
                router.refresh();
                throw 'No user found';
              }
            })
            .catch((error) => {});

          // toast.success('Sucessfully logged in.');
        } else {
          // toast.error('Login Failed! Please check your credentials.');
        }
      })
      .catch((errorResponse) => {
        // toast.error('Login Failed! Please check your credentials.');
      });
    setIsLoading(false);
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: '',
      password: '',
    },
    validateOnChange: true,
    validate: toFormikValidate(loginSchema),
    onSubmit,
  });

  return (
    <FormWrapper
      titleText={true}
      description={
        'To keep connected with us please login to your personal account'
      }
    >
      <form
        className="flex flex-col gap-4 py-5"
        // onSubmit={handleSubmit(submitData)}
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-4">
            {LOGIN_FEILDS.map((item, index) => (
              <div key={index}>
                <InputComp
                  inputValue={formik.values[item.zSchemaName]}
                  getFieldProps={formik.getFieldProps}
                  inputType={item.type}
                  placeholder={item.placeholder}
                  zSchemaName={item.zSchemaName}
                />
                {formik.errors[item.zSchemaName] && (
                  <p className="text-xs text-redError">
                    {formik.errors[item.zSchemaName]}
                  </p>
                )}
              </div>
            ))}
          </div>
          <Link
            href="/confirmEmail"
            type="button"
            className="text-right text-sm text-grayfont hover:text-blueTheme hover:underline"
          >
            Forgot Password
          </Link>
          <ButtonForm label="Login" theme="blue" isLoading={isLoading} />
        </div>
      </form>
    </FormWrapper>
  );
};

export default LoginForm;
