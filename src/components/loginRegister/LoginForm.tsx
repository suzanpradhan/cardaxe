import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import InputComp from '../InputComp';
import FormWrapper from '../FormWrapper';
import ButtonForm from '../ButtonForm';

type zSchemaName = 'email' | 'password';

type LoginFeildProps = {
  placeholder: string;
  type: string;
  zSchemaName: zSchemaName;
};

const LoginSchema = z.object({
  email: z.string().email().trim(),
  password: z
    .string()
    .min(8, { message: 'Must be more than 8 characters' })
    .max(24, { message: 'Must be less than 24 characters' }),
});

type LoginSchemaType = z.infer<typeof LoginSchema>;

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const router = useRouter();

  const submitData = async (data: LoginSchemaType) => {
    console.log(data);
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      callbackUrl: '/dashboard',
      redirect: false,
    });
    if (!res?.error) {
      toast.success('Succefully logged in');
    } else if (res?.error) {
      toast.error('Username or password error');
      console.log(res.error);
      router.push('/login');
    }
  };

  return (
    <FormWrapper
      titleText={true}
      description={
        'To keep connected with us please login to your personal account'
      }
    >
      <form
        className="flex flex-col gap-4 py-2"
        onSubmit={handleSubmit(submitData)}
      >
        <div className="flex flex-col ">
          {LOGIN_FEILDS.map((item, index) => (
            <div key={index} className="h-16">
              <InputComp
                inputType={item.type}
                placeholder={item.placeholder}
                register={register}
                zSchemaName={item.zSchemaName}
              />
              {errors[item.zSchemaName] && (
                <p className="text-xs text-red-600">
                  {errors[item.zSchemaName]?.message}
                </p>
              )}
            </div>
          ))}
          <Link
            href="/confirmEmail"
            type="button"
            className="text-gray-400 text-right -mt-2 mb-2 hover:underline hover:text-blue-600"
          >
            Forgot Password
          </Link>
          <ButtonForm label="Login" />
        </div>
      </form>
    </FormWrapper>
  );
};

export default LoginForm;
