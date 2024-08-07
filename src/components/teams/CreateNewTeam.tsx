import InputComp from '../Inputs/InputComp';

import { InputFieldProps } from '@/core/types/appTypes';
import { ChangeEvent } from 'react';
import { z } from 'zod';

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

const INPUT_FEILDS: InputFieldProps<
  | React.ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLTextAreaElement>
  | boolean
>[] = [
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

const CreateNewTeam = () => {
  // const { register, handleSubmit } = useForm<NewTeamSchemaType>({
  //   resolver: zodResolver(NewTeamSchema),
  // });
  const submitData = (data: NewTeamSchemaType) => {
    console.log(data);
  };
  return (
    <div className="h-full max-w-4xl px-4">
      <h2 className="text-lg font-bold">Create a new team</h2>
      <form
        className="mb-9 flex flex-col gap-4 py-2"
        // onSubmit={handleSubmit(submitData)}
      >
        {INPUT_FEILDS.slice(0, 3).map((item, index) => (
          <div key={index} className="h-16">
            <InputComp
              inputCompType={item.inputCompType}
              inputType={item.inputType}
              placeholder={item.placeholder}
              // register={register}
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
        <div className="h-[10.8rem]">
          <InputComp
            inputCompType={INPUT_FEILDS[3].inputCompType}
            inputType={INPUT_FEILDS[3].inputType}
            placeholder={INPUT_FEILDS[3].placeholder}
            // register={register}
            zSchemaName={INPUT_FEILDS[3].zSchemaName}
            inputLabel={INPUT_FEILDS[3].inputLabel}
          />
        </div>
      </form>
      <p>Add other details ˅</p>
    </div>
  );
};

export default CreateNewTeam;
