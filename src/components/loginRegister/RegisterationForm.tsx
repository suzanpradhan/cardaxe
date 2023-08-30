import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputComp from '../InputComp';
import FormWrapper from '../dashboard/FormWrapper';
import ButtonForm from '../ButtonForm';

type Z_SCHEMA_NAME = 'fullname' | 'email' | 'password' | 'confirmPassword';

type REGISTRATION_FEILDS_PROPS = {
  placeholder: string;
  type: string;
  zSchemaName: Z_SCHEMA_NAME;
};

const RegisterationSchema = z
  .object({
    fullname: z.string().min(2, { message: 'Must be at least 2 characters' }),
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

type RegistrationSchemaType = z.infer<typeof RegisterationSchema>;

const REGISTRATION_FEILDS: REGISTRATION_FEILDS_PROPS[] = [
  {
    placeholder: 'Full Name',
    type: 'text',
    zSchemaName: 'fullname',
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
  const router = useRouter();

  const submitData = async (data: RegistrationSchemaType) => {
    delete data.confirmPassword;

    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/user/register/',
      data: data,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(function (response) {
        console.log(response);
        const message = response.data.msg;
        router.push('/login');
        toast.success(message);
      })
      .catch(function (AxiosError) {
        console.log(AxiosError.response.data.errors.errors[0]);
        const message = AxiosError.response.data.errors.errors[0];
        toast.error(message);
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationSchemaType>({
    resolver: zodResolver(RegisterationSchema),
  });
  return (
    <FormWrapper titleText={true}>
      <div className="flex flex-col ">
        <form
          className="flex flex-col gap-4 py-2"
          onSubmit={handleSubmit(submitData)}
        >
          {REGISTRATION_FEILDS.map((item, index) => (
            <div key={index} className="h-12">
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
          <ButtonForm label="Register" />
        </form>
      </div>
    </FormWrapper>
  );
};

export default RegisterationForm;
