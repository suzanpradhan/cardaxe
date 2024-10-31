'use client';

import ButtonForm from '@/components/ButtonForm';
import InputComp from '@/components/Inputs/InputComp';
import { useAppDispatch } from '@/core/redux/clientStore';
import { registerApi } from '@/module/register/registerApi';
import {
  ForgotPasswordSchema,
  ForgotPasswordSchemaType,
} from '@/module/register/registerType';
import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ZodError } from 'zod';

type Z_SCHEMA_NAME = 'current_password' | 'new_password' | 'new_repassword';

type INPUT_FEILDS_PROPS = {
  placeholder: string;
  type: string;
  zSchemaName: Z_SCHEMA_NAME;
};

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
  const dispatch = useAppDispatch();
  const validateForm = (values: ForgotPasswordSchemaType) => {
    try {
      ForgotPasswordSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        return error.formErrors.fieldErrors;
      }
    }
  };
  const onSubmit = async (data: ForgotPasswordSchemaType) => {
    try {
      const responseData = await dispatch(
        registerApi.endpoints.changeCurrentPassword.initiate({
          current_password: data.current_password,
          new_password: data.new_password,
          new_repassword: data.new_repassword,
        })
      );
      if (Object.prototype.hasOwnProperty.call(responseData, 'data')) {
        router.push('/login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik<ForgotPasswordSchemaType>({
    enableReinitialize: true,
    initialValues: {
      current_password: '',
      new_password: '',
      new_repassword: '',
    },
    validateOnChange: true,
    onSubmit,
    validate: validateForm,
    // validate: toFormikValidate(ContentFormSchema),
    validateOnBlur: true,
  });

  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="mx-auto my-48 flex w-110 flex-col">
      <form
        className="my-6 flex flex-col gap-4 pt-2"
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
      >
        {INPUT_FEILDS.map((item, index) => (
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
          </div>
        ))}
        <ButtonForm label="Register" theme="blue" />
      </form>
    </div>
  );
};

export default ChangeCurrentPassword;
