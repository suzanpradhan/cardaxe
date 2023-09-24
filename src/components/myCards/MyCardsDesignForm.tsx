import React from 'react';
import FormWrapper from '../FormWrapper';
import InputComp from '../InputComp';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';

// const ACCEPTED_IMAGE_TYPES = [
//   'image/jpeg',
//   'image/jpg',
//   'image/png',
//   'image/gif',
// ];
// const MAX_FILE_SIZE = 5242880; // 5MB in bytes

const MyCardDesignFormSchema = z.object({
  backgroundColor: z.string(),
  backgroundImage: z.string(),
  logoUrl: z.string(),
  prefix: z.string(),
});
type MyCardDesignFormSchemaType = z.infer<typeof MyCardDesignFormSchema>;

const MyCardsDesignForm = () => {
  const cardState = useSelector((state: RootState) => state.card);
  const defaultValues: MyCardDesignFormSchemaType = {
    backgroundColor: cardState.designForm.backgroundColor,
    backgroundImage: cardState.designForm.backgroundImage as string,
    logoUrl: cardState.designForm.logoUrl as string,
    prefix: cardState.contentForm.prefix,
  };

  const { register, handleSubmit } = useForm<MyCardDesignFormSchemaType>({
    defaultValues,
    resolver: zodResolver(MyCardDesignFormSchema),
  });
  const submit = (data: MyCardDesignFormSchemaType) => {
    console.log(data);
  };

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex gap-2 items-end">
          <InputComp
            inputCompType="normal"
            inputType="string"
            zSchemaName="backgroundColor"
            register={register}
            inputLabel="Background Color"
            className="inline"
          />
          <div className="h-[42px] basis-4/5  rounded-md bg-inputBgGrey border-borderMain border-1">
            <InputComp
              zSchemaName="backgroundColor"
              inputCompType="color"
              inputType="color"
              register={register}
            />
          </div>
        </div>
        <InputComp
          inputCompType="file"
          inputType="file"
          zSchemaName="backgroundImage"
          register={register}
          inputLabel="Background Image"
          placeholder="Choose Image"
        />
        <InputComp
          inputCompType="file"
          inputType="file"
          zSchemaName="logoUrl"
          register={register}
          inputLabel="Logo"
          placeholder="Choose Image"
        />
      </form>
    </FormWrapper>
  );
};

export default MyCardsDesignForm;
