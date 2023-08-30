import React from 'react';
import FormWrapper from './FormWrapper';
import InputComp from '../InputComp';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import clsx from 'clsx';

type InputFeildsProps = {
  label: string;
  placeholder: string;
  type: string;
  zSchemaName: string;
};

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

const INPUT_FEILDS: InputFeildsProps[] = [
  {
    label: 'Team or Organization Name',
    placeholder: 'e.g. Sharp Venture',
    type: 'text',
    zSchemaName: 'teamOrOrganizationName',
  },
  {
    label: 'Logo',
    placeholder: 'Choose Image',
    type: 'file',
    zSchemaName: 'logo',
  },
  {
    label: 'Category',
    placeholder: 'Select Team Category',
    type: 'text',
    zSchemaName: 'category',
  },
  {
    label: 'Bio',
    placeholder: '',
    type: 'text',
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
      ></form>

      {INPUT_FEILDS.slice(0, SHOW_ITEMS).map((item, index) => (
        <div key={index} className="h-24">
          <InputComp
            inputType={item.type}
            placeholder={item.placeholder}
            register={register}
            name={item.zSchemaName}
            inputLabel={item.label}
          />
          {/* {errors[item.zSchemaName] && (
            <p className="text-xs text-red-600">
              {errors[item.zSchemaName]?.message}
            </p>
          )} */}
        </div>
      ))}
      <div className="h-24">
        <label htmlFor="select">Category</label>
        <select
          id="select"
          className="mt-2 w-full bg-input placeholder:text-placeholder border-inputBorder border-1 rounded-md p-2"
          {...register('category')}
        >
          <option value={''}>--Please select option--</option>
          <option value={'option1'}>Option 1</option>
          <option value={'option2'}>Option 2</option>
          <option value={'option5'}>Option 5</option>
        </select>
      </div>
      <div className="h-40">
        <label htmlFor="select">Bio</label>
        <textarea
          id="select"
          className="h-full mt-2 w-full bg-input placeholder:text-placeholder border-inputBorder border-1 rounded-md p-2"
        />
      </div>
      <p></p>
    </div>
  );
};

export default CreateNewTeam;
