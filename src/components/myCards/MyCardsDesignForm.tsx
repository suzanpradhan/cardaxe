import { RootState } from '@/core/redux/store';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { z } from 'zod';
import FormWrapper from '../FormWrapper';
import InputComp from '../InputComp';

// const ACCEPTED_IMAGE_TYPES = [
//   'image/jpeg',
//   'image/jpg',
//   'image/png',
//   'image/gif',
// ];
// const MAX_FILE_SIZE = 5242880; // 5MB in bytes

const MyCardDesignFormSchema = z.object({
  backgroundColor: z.string(),
  backgroundImage: z.string(),
  logoUrl: z.string(),
  prefix: z.string(),
});
type MyCardDesignFormSchemaType = z.infer<typeof MyCardDesignFormSchema>;

const MyCardsDesignForm = () => {
  const cardState = useSelector((state: RootState) => state.card);
  const defaultValues: MyCardDesignFormSchemaType = {
    backgroundColor: cardState.designForm.backgroundColor,
    backgroundImage: cardState.designForm.backgroundImage as string,
    logoUrl: cardState.designForm.logoUrl as string,
    prefix: cardState.contentForm.prefix,
  };

  const onSubmit = (data: MyCardDesignFormSchemaType) => {
    console.log(data);
  };

  const formik = useFormik<MyCardDesignFormSchemaType>({
    enableReinitialize: true,
    initialValues: { ...defaultValues },
    validateOnChange: true,

    onSubmit,
  });

  return (
    <FormWrapper>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e.target);
          formik.handleSubmit(e);
        }}
        className="flex flex-col gap-4"
      >
        <div className="flex gap-2 items-end">
          <InputComp
            inputCompType="normal"
            inputType="string"
            zSchemaName="backgroundColor"
            inputLabel="Background Color"
            className="inline"
            getFieldProps={formik.getFieldProps}
          />
          <div className="h-[42px] basis-4/5  rounded-md bg-inputBgGrey border-borderMain border-1">
            <InputComp
              zSchemaName="backgroundColor"
              inputCompType="color"
              inputType="color"
              getFieldProps={formik.getFieldProps}
            />
          </div>
        </div>
        <InputComp
          inputCompType="file"
          inputType="file"
          zSchemaName="backgroundImage"
          inputLabel="Background Image"
          placeholder="Choose Image"
          getFieldProps={formik.getFieldProps}
        />
        <InputComp
          inputCompType="file"
          inputType="file"
          zSchemaName="logoUrl"
          inputLabel="Logo"
          placeholder="Choose Image"
          getFieldProps={formik.getFieldProps}
        />
      </form>
    </FormWrapper>
  );
};

export default MyCardsDesignForm;
