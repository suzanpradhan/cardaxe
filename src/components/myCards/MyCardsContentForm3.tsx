import { InputFieldProps } from '@/core/types/appTypes';
import { ContentFormSchemaType } from '@/module/cards/cardsType';
import { FormikErrors } from 'formik';
import { ChangeEvent } from 'react';
import InputComp from '../InputComp';
import { Card, CardContent, CardHeader } from '../ui/card';

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

const INPUT_FEILDS: InputFieldProps<
  | React.ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLTextAreaElement>
  | boolean
>[] = [
  {
    inputCompType: 'normal',
    inputLabel: 'Designation',
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
    <Card className="pb-4 shadow-none">
      <CardHeader className="pb-2 font-bold">Professional Info</CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {INPUT_FEILDS.map((item, index) => (
            <InputComp
              inputType="text"
              zSchemaName={item.zSchemaName}
              inputLabel={item.inputLabel}
              key={index}
              // getFieldProps={getFieldProps}
              inputCompType={item.inputCompType}
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
              inputValue={
                values[item.zSchemaName as keyof ContentFormSchemaType] ?? ''
              }
              error={errors[item.zSchemaName as keyof ContentFormSchemaType]}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MyCardsContentForm3;
