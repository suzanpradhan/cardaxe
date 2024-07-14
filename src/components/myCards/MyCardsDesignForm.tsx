import { DesignFromSchemaType } from '@/module/cards/cardsType';
import { FormikErrors } from 'formik';
import { ChangeEvent } from 'react';
import InputComp from '../InputComp';
import { Card, CardContent, CardHeader } from '../ui/card';

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
    <Card className="pb-4 shadow-none">
      <CardHeader className="pb-2 font-bold">Basic Design</CardHeader>
      <CardContent className="">
        <div className="flex flex-col gap-3">
          <div className="flex items-end gap-2">
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
            <div className="h-[42px] basis-4/5 rounded-md border-1 border-borderMain bg-inputBgGrey">
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
          <div className="flex items-end gap-2">
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
            <div className="h-[42px] basis-4/5 rounded-md border-1 border-borderMain bg-inputBgGrey">
              <InputComp
                zSchemaName="foregroundColor"
                inputCompType="color"
                inputType="color"
                inputValue={values['foregroundColor']}
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
                error={errors['foregroundColor']}
              />
            </div>
          </div>
          <InputComp
            inputCompType="file"
            inputType="file"
            className="mb-3 w-[98%]"
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
        </div>
      </CardContent>
    </Card>
  );
};

export default MyCardsDesignForm;
