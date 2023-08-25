import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

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
      callbackUrl: 'http://localhost:3000/',
      redirect: false,
    });
    if (res?.error) {
      router.push('/login');
    }
  };

  return (
    <div className="flex flex-col ">
      <h1 className="text-4xl font-extrabold ">cardaxe.</h1>
      <p className="pb-3">
        To keep connected with us please login to your personal account
      </p>
      <form
        className="flex flex-col gap-4 pt-2"
        onSubmit={handleSubmit(submitData)}
      >
        {LOGIN_FEILDS.map((item, index) => (
          <div key={index} className="h-12">
            <input
              type={item.type}
              placeholder={item.placeholder}
              className="w-full bg-input placeholder:text-placeholder border-inputBorder border-1 rounded-md p-2"
              required
              {...register(item.zSchemaName)}
            ></input>
            {errors[item.zSchemaName] && (
              <p className="text-xs text-red-600">
                {errors[item.zSchemaName]?.message}
              </p>
            )}
          </div>
        ))}
        <Link
          href="/"
          className="text-gray-400 text-right -mt-1 hover:underline hover:text-blue-500"
        >
          Forgot Password
        </Link>
        <button type="submit" className="bg-blue-500 rounded-md p-2 text-white">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
