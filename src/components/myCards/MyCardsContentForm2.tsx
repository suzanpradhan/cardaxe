import { InputFieldProps } from '@/core/types/appTypes';
import { ContentFormSchemaType } from '@/module/cards/cardsType';
import { FieldConfig, FieldInputProps } from 'formik';
import { ChangeEvent } from 'react';
import FormWrapper from '../FormWrapper';
import InputComp from '../InputComp';

interface MyCardsContentForm2Props {
  getFieldProps: (
    nameOrOptions: string | FieldConfig<any>
  ) => FieldInputProps<any>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  values: ContentFormSchemaType;
}

const INPUT_FEILDS: InputFieldProps[] = [
  {
    inputLabel: 'Phone',
    zSchemaName: 'phone',
    inputCompType: 'normal',
  },
  {
    inputLabel: 'Website',
    zSchemaName: 'website',
    inputCompType: 'normal',
  },
  {
    inputLabel: 'Email',
    zSchemaName: 'email',
    inputCompType: 'normal',
  },
];

const MyCardsContentForm2 = ({
  getFieldProps,
  handleChange,
  values,
}: MyCardsContentForm2Props) => {
  return (
    <FormWrapper>
      <div className="flex flex-col gap-3">
        {INPUT_FEILDS.map((item: InputFieldProps, index: number) => (
          <InputComp
            inputType="text"
            getFieldProps={getFieldProps}
            inputCompType={item.inputCompType}
            zSchemaName={item.zSchemaName}
            inputLabel={item.inputLabel}
            key={index}
            handleChange={handleChange}
            inputValue={values[item.zSchemaName]}
          />
        ))}
      </div>
    </FormWrapper>
  );
};

export default MyCardsContentForm2;
