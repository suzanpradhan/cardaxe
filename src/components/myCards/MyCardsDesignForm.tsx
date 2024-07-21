import { DesignFromSchemaType } from '@/module/cards/cardsType';
import { FormikErrors } from 'formik';
import { ChangeEvent } from 'react';
import ColorInput from '../Inputs/ColorInput';
import FileInput from '../Inputs/FileInput';
import TextInput from '../Inputs/TextInput';
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
            <TextInput
              id="backgroundColor"
              rows={5}
              name={'backgroundColor'}
              error={errors['backgroundColor']}
              label={'Background Color'}
              required={true}
              value={values['backgroundColor'] ?? undefined}
              onChange={handleChange}
            />
            <div className="h-[42px] basis-4/5 rounded-md border-1 border-borderMain bg-inputBgGrey">
              <ColorInput
                id="backgroundColor"
                name={'backgroundColor'}
                value={values['backgroundColor'] ?? undefined}
                onChange={handleChange}
                required={true}
                error={errors['backgroundColor']}
              />
            </div>
          </div>
          <FileInput
            id="backgroundImage"
            // className="mb-3 w-[98%]"
            required
            label="Background Image"
            name="backgroundImage"
            placeholder="Background Image"
            value={values['backgroundImage'] ?? undefined}
            error={errors['backgroundImage']}
            onChange={
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
          <FileInput
            id="logo"
            // className="mb-3 w-[98%]"
            required
            label="Logo"
            name="logo"
            placeholder="Logo image"
            value={values['logo'] ?? undefined}
            error={errors['logo']}
            onChange={
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
          {/* <InputComp
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
          /> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default MyCardsDesignForm;
