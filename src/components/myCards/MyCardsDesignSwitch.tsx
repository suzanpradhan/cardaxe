import { RootState } from '@/core/redux/store';
import { useSelector } from 'react-redux';
import { z } from 'zod';
import FormWrapper from '../FormWrapper';
import InputComp from '../InputComp';

const SwitchFormSchema = z.object({
  showSocialIcons: z.boolean(),
  showLogo: z.boolean(),
  darkMode: z.boolean(),
});
type SwitchFormSchemaType = z.infer<typeof SwitchFormSchema>;

const INPUT_FIELDS = [
  {
    zSchemaName: 'showSocialIcons',
    inputLabel: 'Show Social Icons',
  },
  {
    zSchemaName: 'showLogo',
    inputLabel: 'Show Logo',
  },
  {
    zSchemaName: 'darkMode',
    inputLabel: 'Dark Mode',
  },
];

const MyCardsDesignSwitch = () => {
  const cardState = useSelector((state: RootState) => state.card);
  const defaultValues = cardState.designForm;
  // const { register } = useForm<SwitchFormSchemaType>({
  //   defaultValues,
  //   resolver: zodResolver(SwitchFormSchema),
  // });
  return (
    <FormWrapper>
      <div className="flex flex-col gap-4">
        {INPUT_FIELDS.map((item, index) => (
          <InputComp
            key={index}
            zSchemaName={item.zSchemaName}
            inputCompType="switch"
            inputLabel={item.inputLabel}
            inputType="checkbox"
          />
        ))}
      </div>
    </FormWrapper>
  );
};

export default MyCardsDesignSwitch;
