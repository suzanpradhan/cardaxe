import { InputFieldProps } from '@/core/types/appTypes';
import { ContentFormSchemaType } from '@/module/cards/cardsType';
import { FormikErrors } from 'formik';
import { ChangeEvent } from 'react';
import InputComp from '../InputComp';
import { Card, CardContent, CardHeader } from '../ui/card';

interface MyCardsContentForm2Props {
  // getFieldProps: (
  //   nameOrOptions: string | FieldConfig<any>
  // ) => FieldInputProps<any>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  values: ContentFormSchemaType;
  errors: FormikErrors<ContentFormSchemaType>;
  fieldPlaceHolder: ContentFormSchemaType;
}

const INPUT_FEILDS: InputFieldProps<
  | React.ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLTextAreaElement>
  | boolean
>[] = [
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
  {
    inputLabel: 'Address',
    zSchemaName: 'address',
    inputCompType: 'normal',
  },
];

const MyCardsContentForm2 = ({
  handleChange,
  values,
  errors,
  fieldPlaceHolder,
}: MyCardsContentForm2Props) => {
  return (
    <Card className="pb-4 shadow-none">
      <CardHeader className="pb-2 font-bold">Personal Info</CardHeader>

      <CardContent>
        <div className="flex flex-col gap-3">
          {INPUT_FEILDS.map(
            (
              item: InputFieldProps<
                | React.ChangeEvent<HTMLInputElement>
                | ChangeEvent<HTMLTextAreaElement>
                | boolean
              >,
              index: number
            ) => (
              <InputComp
                inputType="text"
                // getFieldProps={getFieldProps}
                inputCompType={item.inputCompType}
                zSchemaName={item.zSchemaName}
                inputLabel={item.inputLabel}
                key={index}
                placeholder={
                  fieldPlaceHolder?.[
                    item.zSchemaName as keyof ContentFormSchemaType
                  ]
                    ? ` ${
                        fieldPlaceHolder[
                          item.zSchemaName as keyof ContentFormSchemaType
                        ]
                      }`
                    : ''
                }
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
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MyCardsContentForm2;
