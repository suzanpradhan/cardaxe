import { InputFieldProps } from '@/core/types/appTypes';
import { ContentFormSchemaType } from '@/module/cards/cardsType';
import { FieldConfig, FieldInputProps, FormikErrors } from 'formik';
import { ChangeEvent } from 'react';
import FormWrapper from '../FormWrapper';
import InputComp from '../InputComp';

interface MyCardsContentForm1Props {
  getFieldProps: (
    nameOrOptions: string | FieldConfig<any>
  ) => FieldInputProps<any>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  values: ContentFormSchemaType;
  errors: FormikErrors<ContentFormSchemaType>;
}

const INPUT_FEILDS: InputFieldProps[] = [
  {
    inputCompType: 'normal',
    inputLabel: 'Prefix',
    zSchemaName: 'prefix',
  },
  {
    inputCompType: 'normal',
    inputLabel: 'First Name',
    zSchemaName: 'firstName',
  },
  {
    inputCompType: 'normal',
    inputLabel: 'Middle Name',
    zSchemaName: 'middleName',
  },
  {
    inputCompType: 'normal',
    inputLabel: 'Last Name',
    zSchemaName: 'lastName',
  },
  {
    inputCompType: 'normal',
    inputLabel: 'Suffix',
    zSchemaName: 'suffix',
  },
  {
    inputCompType: 'textArea',
    inputLabel: 'Bio',
    zSchemaName: 'bio',
  },
];

const MyCardsContentForm1 = ({
  getFieldProps,
  handleChange,
  values,
  errors,
}: MyCardsContentForm1Props) => {
  const selectOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  values.email;

  return (
    <FormWrapper>
      <div className="flex flex-col gap-3">
        {INPUT_FEILDS.map((item: InputFieldProps, index: number) => (
          <InputComp
            inputCompType={item.inputCompType}
            inputType="text"
            zSchemaName={item.zSchemaName}
            inputLabel={item.inputLabel}
            key={index}
            // getFieldProps={getFieldProps}
            handleChange={handleChange}
            inputValue={
              values[item.zSchemaName as keyof ContentFormSchemaType] ?? ''
            }
            error={errors[item.zSchemaName as keyof ContentFormSchemaType]}
          />
        ))}
      </div>
    </FormWrapper>
  );
};

export default MyCardsContentForm1;
