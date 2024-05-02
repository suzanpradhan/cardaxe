import { DesignFromSchemaType } from '@/module/cards/cardsType';
import { FieldConfig, FieldInputProps, FormikErrors } from 'formik';
import { ChangeEvent } from 'react';
import FormWrapper from '../FormWrapper';
import InputComp from '../InputComp';

interface MyCardsDesignFormProps {
  getFieldProps: (
    nameOrOptions: string | FieldConfig<any>
  ) => FieldInputProps<any>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  values: DesignFromSchemaType;
  errors: FormikErrors<DesignFromSchemaType>;
}

// const ACCEPTED_IMAGE_TYPES = [
//   'image/jpeg',
//   'image/jpg',
//   'image/png',
//   'image/gif',
// ];
// const MAX_FILE_SIZE = 5242880; // 5MB in bytes

const MyCardsDesignForm = ({
  errors,
  getFieldProps,
  handleChange,
  values,
}: MyCardsDesignFormProps) => {
  return (
    <FormWrapper>
      <div className="flex gap-2 items-end">
        <InputComp
          inputCompType="normal"
          inputType="string"
          zSchemaName="backgroundColor"
          inputLabel="Background Color"
          className="inline"
          getFieldProps={getFieldProps}
          inputValue={values['backgroundColor']}
          handleChange={handleChange}
          error={errors['backgroundColor']}
        />
        <div className="h-[42px] basis-4/5  rounded-md bg-inputBgGrey border-borderMain border-1">
          <InputComp
            zSchemaName="backgroundColor"
            inputCompType="color"
            inputType="color"
            getFieldProps={getFieldProps}
            inputValue={values['backgroundColor']}
            handleChange={handleChange}
            error={errors['backgroundColor']}
          />
        </div>
      </div>
      <InputComp
        inputCompType="file"
        inputType="file"
        zSchemaName="backgroundImage"
        inputLabel="Background Image"
        placeholder="Choose Image"
        getFieldProps={getFieldProps}
        // inputValue={values['backgroundImage']}
        error={errors['backgroundImage']}
        handleChange={handleChange}
      />
      <InputComp
        inputCompType="file"
        inputType="file"
        zSchemaName="logoUrl"
        inputLabel="Logo"
        placeholder="Choose Image"
        getFieldProps={getFieldProps}
        // inputValue={formik.values['logoUrl']}
        handleChange={handleChange}
        error={errors['logoUrl']}
      />
    </FormWrapper>
  );
};

export default MyCardsDesignForm;
