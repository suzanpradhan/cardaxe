import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

type Z_SCHEMA_NAME = 'full_name' | 'email' | 'password' | 'confirmPassword';

type REGISTRATION_FEILDS_PROPS = {
  placeholder: string;
  type: string;
  zSchemaName: Z_SCHEMA_NAME;
};

const RegisterationSchema = z
  .object({
    full_name: z.string().min(2, { message: 'Must be at least 2 characters' }),
    email: z.string().email().trim(),
    password: z
      .string()
      .min(8, { message: 'Must be more than 8 characters' })
      .max(24, { message: 'Must be less than 24 characters' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Must be more than 8 characters' })
      .max(24, { message: 'Must be less than 24 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegistrationSchemaType = z.infer<typeof RegisterationSchema>;

const REGISTRATION_FEILDS: REGISTRATION_FEILDS_PROPS[] = [
  {
    placeholder: 'Full Name',
    type: 'text',
    zSchemaName: 'full_name',
  },
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

const RegisterationForm: React.FC = () => {
  const submitData = (data: RegistrationSchemaType) => {
    console.log(data);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationSchemaType>({
    resolver: zodResolver(RegisterationSchema),
  });
  return (
    <div className="flex flex-col ">
      <h1 className="text-4xl font-extrabold py-3">cardaxe.</h1>
      <form
        className="flex flex-col gap-4 py-2"
        onSubmit={handleSubmit(submitData)}
      >
        {REGISTRATION_FEILDS.map((item, index) => (
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
        <button type="submit" className="bg-blue-500 rounded-md p-2 text-white">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterationForm;
