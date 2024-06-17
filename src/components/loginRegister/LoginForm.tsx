import { LoginSchemaType, loginSchema } from '@/module/login/loginType';
import { useFormik } from 'formik';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { toFormikValidate } from 'zod-formik-adapter';
import ButtonForm from '../ButtonForm';
import FormWrapper from '../FormWrapper';
import InputComp from '../InputComp';

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
  const navigator = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const callback = searchParams.get('callback');
  const onSubmit = async (data: LoginSchemaType) => {
    setIsLoading(true);
    await signIn('credentials', {
      email: data.email.toLowerCase(),
      password: data.password.toLowerCase(),
      callbackUrl: '/dashboard',
      redirect: false,
    }).then((response) => {
      if (!response?.error) {
        toast.success('Sucessfully logged in.');
        if (callback) {
          window.location.href = callback;
          if (callback.includes('#')) window.location.reload();
        } else {
          navigator.refresh();
        }
      } else {
        toast.error(response?.error);
        setError(response?.error!);
      }
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
        className="flex flex-col gap-4 py-2"
        // onSubmit={handleSubmit(submitData)}
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
      >
        <div className="flex flex-col ">
          {LOGIN_FEILDS.map((item, index) => (
            <div key={index} className="h-16">
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
          <Link
            href="/confirmEmail"
            type="button"
            className="text-grayfont text-right mb-2 hover:underline hover:text-blueTheme"
          >
            Forgot Password
          </Link>
          <ButtonForm label="Login" bluebackground isLoading={isLoading} />
        </div>
      </form>
    </FormWrapper>
  );
};

export default LoginForm;
