'use client';
import {
  CardState,
  updateContentForm,
  updateErrors,
} from '@/app/GlobalRedux/Features/cardSlice';
import ButtonForm from '@/components/ButtonForm';
import MyCardsContentForm1 from '@/components/myCards/MyCardsContentForm1';
import MyCardsContentForm2 from '@/components/myCards/MyCardsContentForm2';
import MyCardsContentForm3 from '@/components/myCards/MyCardsContentForm3';
import { useAppDispatch } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import cardsApi from '@/module/cards/cardsApi';

// import { useForm } from 'react-hook-form';
import {
  ContentFormSchema,
  ContentFormSchemaType,
} from '@/module/cards/cardsType';
import { useFormik } from 'formik';
import { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ZodError } from 'zod';

const ContentsPage = () => {
  const dispatch = useAppDispatch();
  const cardState = useSelector((state: RootState) => state.card);
  const defaultValues = cardState.contentForm;
  // const { register, handleSubmit } = useForm<ContentFormSchemaType>({
  //   defaultValues,
  //   resolver: zodResolver(ContentFormSchema),
  // });

  const onSubmit = (values: ContentFormSchemaType) => {
    console.log(values);
    const submitresponse = dispatch(
      cardsApi.endpoints.updateContents.initiate(values)
    );
    submitresponse
      .then((res) => toast.success('Submitted Successfulluy'))
      .catch((err) => {
        toast.error('Something went wrong');
        throw err;
      });
  };
  const validateForm = (values: ContentFormSchemaType) => {
    try {
      ContentFormSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error);

        return error.formErrors.fieldErrors;
      }
    }
  };
  const formik = useFormik<ContentFormSchemaType>({
    // enableReinitialize: true,
    initialValues: { id: 1, ...defaultValues },
    // validateOnChange: true,
    onSubmit,
    validate: validateForm,
    // validate: toFormikValidate(ContentFormSchema),
    // validateOnBlur: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log(formik.errors[name as keyof CardState['contentForm']]);

    const updatedFormState: CardState['contentForm'] = {
      ...cardState.contentForm,
      [name]: value,
    };
    console.log(
      'input error',
      formik.errors[name as keyof CardState['contentForm']]
    );
    if (formik.errors['name' as keyof CardState['contentForm']] === null) {
      dispatch(updateContentForm(updatedFormState));
      console.log('@no error');
    } else {
      dispatch(updateErrors({ ...cardState.errors, contentForm: true }));
      console.log(cardState.errors.contentForm);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(e.target);
        formik.handleSubmit(e);
      }}
      className="flex flex-col gap-4"
    >
      <MyCardsContentForm1
        getFieldProps={formik.getFieldProps}
        handleChange={handleChange}
        values={formik.values}
        errors={formik.errors}
      />
      <MyCardsContentForm2
        getFieldProps={formik.getFieldProps}
        handleChange={handleChange}
        values={formik.values}
        errors={formik.errors}
      />
      <MyCardsContentForm3
        getFieldProps={formik.getFieldProps}
        handleChange={handleChange}
        values={formik.values}
        errors={formik.errors}
      />
      <ButtonForm label="submit" />
    </form>
  );
};

export default ContentsPage;
