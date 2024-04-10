import { useAppDispatch } from '@/core/redux/clientStore';
import { registerApi } from '@/module/register/registerApi';
import {
  RegistrationSchemaType,
  registerationSchema,
} from '@/module/register/registerType';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toFormikValidate } from 'zod-formik-adapter';
import ButtonForm from '../ButtonForm';
import FormWrapper from '../FormWrapper';
import InputComp from '../InputComp';

type Z_SCHEMA_NAME = 'fullname' | 'email' | 'password' | 'confirmPassword';

type REGISTRATION_FEILDS_PROPS = {
  placeholder: string;
  type: string;
  zSchemaName: Z_SCHEMA_NAME;
};

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
  const dispatch = useAppDispatch();

  const onSubmit = async (data: RegistrationSchemaType) => {
    console.log('register form data', data);

    try {
      const responseData = await dispatch(
        registerApi.endpoints.signUp.initiate({
          fullname: data.fullname,
          email: data.email,
          password: data.password,
        })
      );
      if (Object.prototype.hasOwnProperty.call(responseData, 'error')) {
        console.log('regsister response', responseData);
      } else if (Object.prototype.hasOwnProperty.call(responseData, 'data')) {
        console.log('regsister response', responseData);
        router.push('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      fullname: '',
      confirmPassword: '',
      email: '',
      password: '',
    },
    validateOnChange: true,
    validate: toFormikValidate(registerationSchema),
    onSubmit,
  });

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<RegistrationSchemaType>({
  //   resolver: zodResolver(RegisterationSchema),
  // });
  return (
    <FormWrapper titleText={true}>
      <div className="flex flex-col ">
        <form
          className="flex flex-col gap-4 py-2"
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit(e);
          }}
        >
          {REGISTRATION_FEILDS.map((item, index) => (
            <div key={index} className="h-12">
              <InputComp
                inputType={item.type}
                inputValue={formik.values[item.zSchemaName]}
                placeholder={item.placeholder}
                getFieldProps={formik.getFieldProps}
                zSchemaName={item.zSchemaName}
              />
              {formik.errors[item.zSchemaName] && (
                <p className="text-xs text-redError">
                  {formik.errors[item.zSchemaName]}
                </p>
              )}
              {/* {errors[item.zSchemaName] && (
                <p className="text-xs text-redError">
                  {errors[item.zSchemaName]?.message}
                </p>
              )} */}
            </div>
          ))}
          <ButtonForm label="Register" bluebackground />
        </form>
      </div>
    </FormWrapper>
  );
};

export default RegisterationForm;
