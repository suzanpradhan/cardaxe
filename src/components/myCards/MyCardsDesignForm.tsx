import { DesignFromSchemaType } from '@/module/cards/cardsType';
import { FormikErrors } from 'formik';
import { ChangeEvent } from 'react';
import FormWrapper from '../FormWrapper';
import InputComp from '../InputComp';

interface MyCardsDesignFormProps {
  // getFieldProps: (
  //   nameOrOptions: string | FieldConfig<any>
  // ) => FieldInputProps<any>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  values: DesignFromSchemaType;
  errors: FormikErrors<DesignFromSchemaType>;
}

const MyCardsDesignForm = ({
  errors,
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
          inputValue={values['backgroundColor']}
          handleChange={
            handleChange as
              | ((
                  e:
                    | boolean
                    | ChangeEvent<HTMLInputElement>
                    | ChangeEvent<HTMLTextAreaElement>
                ) => void)
              | undefined
          }
          error={errors['backgroundColor']}
          disableInput
        />
        <div className="h-[42px] basis-4/5  rounded-md bg-inputBgGrey border-borderMain border-1">
          <InputComp
            zSchemaName="backgroundColor"
            inputCompType="color"
            inputType="color"
            inputValue={values['backgroundColor']}
            handleChange={
              handleChange as
                | ((
                    e:
                      | boolean
                      | ChangeEvent<HTMLInputElement>
                      | ChangeEvent<HTMLTextAreaElement>
                  ) => void)
                | undefined
            }
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
        inputValue={values['backgroundImage']}
        error={errors['backgroundImage']}
        handleChange={
          handleChange as
            | ((
                e:
                  | boolean
                  | ChangeEvent<HTMLInputElement>
                  | ChangeEvent<HTMLTextAreaElement>
              ) => void)
            | undefined
        }
      />
      <InputComp
        inputCompType="file"
        inputType="file"
        zSchemaName="logo"
        inputLabel="Logo"
        placeholder="Choose Image"
        // getFieldProps={getFieldProps}
        inputValue={values['logo']}
        handleChange={
          handleChange as
            | ((
                e:
                  | boolean
                  | ChangeEvent<HTMLInputElement>
                  | ChangeEvent<HTMLTextAreaElement>
              ) => void)
            | undefined
        }
        error={errors['logo']}
      />
    </FormWrapper>
  );
};

export default MyCardsDesignForm;
