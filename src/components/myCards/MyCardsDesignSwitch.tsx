import { DesignFromSchemaType } from '@/module/cards/cardsType';
import { FormikErrors } from 'formik';
import { ChangeEvent } from 'react';
import FormWrapper from '../FormWrapper';
import InputComp from '../Inputs/InputComp';

interface MyCardsDesignSwitchProps {
  // getFieldProps: (
  //   nameOrOptions: string | FieldConfig<any>
  // ) => FieldInputProps<any>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  values: DesignFromSchemaType;
  errors: FormikErrors<DesignFromSchemaType>;
}

const INPUT_FIELDS = [
  {
    zSchemaName: 'showSocialIcons',
    inputLabel: 'Show Social Icons',
  },
  {
    zSchemaName: 'showLogo',
    inputLabel: 'Show Logo',
  },
  {
    zSchemaName: 'darkMode',
    inputLabel: 'Dark Mode',
  },
];

const MyCardsDesignSwitch = ({
  errors,
  // getFieldProps,
  handleChange,
  values,
}: MyCardsDesignSwitchProps) => {
  return (
    <FormWrapper>
      <div className="flex flex-col gap-4">
        {INPUT_FIELDS.map((item, index) => (
          <InputComp
            key={index}
            zSchemaName={item.zSchemaName}
            inputCompType="switch"
            inputLabel={item.inputLabel}
            inputType="checkbox"
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
            error={errors[item.zSchemaName as keyof DesignFromSchemaType]}
            // getFieldProps={getFieldProps}
            inputValue={values[item.zSchemaName as keyof DesignFromSchemaType]}
          />
        ))}
      </div>
    </FormWrapper>
  );
};

export default MyCardsDesignSwitch;
