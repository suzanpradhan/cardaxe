'use client';
import {
  CardState,
  updateContentForm,
} from '@/app/GlobalRedux/Features/cardSlice';
import ButtonForm from '@/components/ButtonForm';
import MyCardsContentForm1 from '@/components/myCards/MyCardsContentForm1';
import MyCardsContentForm2 from '@/components/myCards/MyCardsContentForm2';
import MyCardsContentForm3 from '@/components/myCards/MyCardsContentForm3';
import { useAppDispatch } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import cardsApi from '@/module/cards/cardsApi';
// import { useForm } from 'react-hook-form';
import { ContentFormSchemaType } from '@/module/cards/cardsType';
import { useFormik } from 'formik';
import { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';

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
    console.log(submitresponse);
  };
  const formik = useFormik<ContentFormSchemaType>({
    enableReinitialize: true,
    initialValues: { id: 1, ...defaultValues },
    validateOnChange: false,
    onSubmit,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    console.log('chabe');
    const { name, value, type } = e.target;
    // const stateValue =
    //   type === 'file' && files ? window.URL.createObjectURL(files[0]) : value;

    const updatedFormState: CardState['contentForm'] = {
      ...cardState.contentForm,
      [name]: value,
    };
    dispatch(updateContentForm(updatedFormState));
    console.log(cardState.contentForm);
  };

  console.log(formik.values);

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
      />
      <MyCardsContentForm2
        getFieldProps={formik.getFieldProps}
        handleChange={handleChange}
        values={formik.values}
      />
      <MyCardsContentForm3
        getFieldProps={formik.getFieldProps}
        handleChange={handleChange}
        values={formik.values}
      />
      <ButtonForm label="submit" />
    </form>
  );
};

export default ContentsPage;
