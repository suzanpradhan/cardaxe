import FormWrapper from '../FormWrapper';

import { InputFieldProps } from '@/core/types/appTypes';
import { ContentFormSchemaType } from '@/module/cards/cardsType';
import { FormikErrors } from 'formik';
import { ChangeEvent } from 'react';
import InputComp from '../InputComp';

interface MyCardsContentForm3Props {
  // getFieldProps: (
  //   nameOrOptions: string | FieldConfig<any>
  // ) => FieldInputProps<any>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  values: ContentFormSchemaType;
  errors: FormikErrors<ContentFormSchemaType>;
}

const INPUT_FEILDS: InputFieldProps[] = [
  {
    inputCompType: 'normal',
    inputLabel: 'Title',
    zSchemaName: 'designation',
  },
  {
    inputCompType: 'normal',
    inputLabel: 'Department',
    zSchemaName: 'department',
  },
  {
    inputCompType: 'normal',
    inputLabel: 'Company',
    zSchemaName: 'company',
  },
];

const MyCardsContentForm3 = ({
  handleChange,
  values,
  errors,
}: MyCardsContentForm3Props) => {
  return (
    <FormWrapper>
      <div className="flex flex-col gap-3">
        {INPUT_FEILDS.map((item, index) => (
          <InputComp
            inputType="text"
            zSchemaName={item.zSchemaName}
            inputLabel={item.inputLabel}
            key={index}
            // getFieldProps={getFieldProps}
            inputCompType={item.inputCompType}
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

export default MyCardsContentForm3;
