import React from 'react';
import FormWrapper from '../FormWrapper';
import InputComp from '../InputComp';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import clsx from 'clsx';
import { InputFieldProps } from '@/types/appTypes';

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
];
const MAX_FILE_SIZE = 5242880; // 5MB in bytes

const NewTeamSchema = z.object({
  teamOrOrganizationName: z.string(),
  category: z.enum(['good', 'bad', 'excellent']),
  logo: z
    .instanceof(File)
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: 'Invalid file type. Accepted types: JPEG, JPG, PNG, GIF.',
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}`,
    }),
  bio: z.string(),
});

type NewTeamSchemaType = z.infer<typeof NewTeamSchema>;

const INPUT_FEILDS: InputFieldProps[] = [
  {
    inputCompType: 'normal',
    inputLabel: 'Team or Organization Name',
    placeholder: 'e.g. Sharp Venture',
    inputType: 'text',
    zSchemaName: 'teamOrOrganizationName',
  },
  {
    inputCompType: 'file',
    inputLabel: 'Logo',
    placeholder: 'Choose Image',
    inputType: 'file',
    zSchemaName: 'logo',
  },
  {
    inputCompType: 'select',
    inputLabel: 'Category',
    placeholder: 'Select Team Category',
    inputType: 'text',
    zSchemaName: 'category',
  },
  {
    inputCompType: 'textArea',
    inputLabel: 'Bio',
    placeholder: '',
    inputType: 'text',
    zSchemaName: 'bio',
  },
];

const SHOW_ITEMS = 2;
const SHOW_LAST_ELEMENT = 4;

const CreateNewTeam = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewTeamSchemaType>({
    resolver: zodResolver(NewTeamSchema),
  });
  const submitData = (data: NewTeamSchemaType) => {
    console.log(data);
  };
  return (
    <div className="max-w-4xl px-4">
      <h2 className="font-bold">Create a new team</h2>
      <form
        className="flex flex-col gap-4 py-2"
        onSubmit={handleSubmit(submitData)}
      >
        {INPUT_FEILDS.map((item, index) => (
          <div key={index} className="h-24">
            <InputComp
              inputCompType={item.inputCompType}
              inputType={item.inputType}
              placeholder={item.placeholder}
              register={register}
              zSchemaName={item.zSchemaName}
              inputLabel={item.inputLabel}
            />
            {/* {errors[item.zSchemaName] && (
            <p className="text-xs text-red-600">
            {errors[item.zSchemaName]?.message}
            </p>
          )} */}
          </div>
        ))}
      </form>
      <p></p>
    </div>
  );
};

export default CreateNewTeam;
