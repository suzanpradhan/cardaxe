import { InputFieldProps } from '@/core/types/appTypes';
import { ContentFormSchemaType } from '@/module/cards/cardsType';
import { FormikErrors } from 'formik';
import { ChangeEvent } from 'react';
import InputComp from '../InputComp';
import { Card, CardContent, CardHeader } from '../ui/card';

interface MyCardsContentForm1Props {
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
  React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
>[] = [
  {
    inputCompType: 'normal',
    inputLabel: 'Title',
    zSchemaName: 'title',
  },
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
  // getFieldProps,
  handleChange,
  values,
  errors,
  fieldPlaceHolder,
}: MyCardsContentForm1Props) => {
  const selectOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  return (
    <Card className="pb-4 shadow-none">
      <CardHeader className="font-bold">Basic Info</CardHeader>
      <CardContent className="gap-3">
        <div className="flex flex-col gap-3">
          {INPUT_FEILDS.map(
            (
              item: InputFieldProps<
                | React.ChangeEvent<HTMLInputElement>
                | ChangeEvent<HTMLTextAreaElement>
              >,
              index: number
            ) => (
              <InputComp
                inputCompType={item.inputCompType}
                inputType="text"
                placeholder={
                  fieldPlaceHolder?.[
                    item.zSchemaName as keyof ContentFormSchemaType
                  ]
                    ? `Your ${
                        fieldPlaceHolder[
                          item.zSchemaName as keyof ContentFormSchemaType
                        ]
                      } Required`
                    : ''
                }
                zSchemaName={item.zSchemaName}
                inputLabel={item.inputLabel}
                key={index}
                // getFieldProps={getFieldProps}
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

export default MyCardsContentForm1;
