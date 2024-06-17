import clsx from 'clsx';
import Image, { StaticImageData } from 'next/image';

export type SocialMediaValueType = {
  url?: string;
  displayText?: string;
  id?: string;
};

type SocialMediaFormProps = {
  socialLinkName: string;
  socialLinkTitle: string;
  socialLinkLogo: StaticImageData;
  placeholder: string;
  error: SocialMediaValueType;
  socialMedialValue?: SocialMediaValueType;
  categoryId: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    categoryId: string
  ) => void;
};

type InputFieldsType = {
  url: {
    type: string;
    zSchemaName: string;
  };
  displayText: {
    type: string;
    zSchemaName: string;
  };
};

const INPUT_FEILDS: InputFieldsType = {
  url: {
    type: 'text',
    zSchemaName: 'url',
  },
  displayText: {
    type: 'text',
    zSchemaName: 'displayText',
  },
};
const SocialMediaForm = ({
  handleChange,
  socialLinkTitle,
  categoryId,
  socialLinkName,
  socialLinkLogo,
  placeholder,
  error,
  socialMedialValue,
}: SocialMediaFormProps) => {
  return (
    <div className="flex max-w-7xl flex-wrap p-2 gap-1">
      <p className="shrink-0 basis-full">{socialLinkTitle}</p>
      <div className="w-12 shrink-0 p-2">
        <Image
          src={socialLinkLogo}
          sizes="(max-width: 768px) 100vw, 700px"
          objectFit="cover"
          alt="social site image"
        />
      </div>
      {/* <InputComp
            inputCompType="normal"
            socialLinkName={socialLinkName}
            key={index}
            handleChange={handleChange}
            inputType={item.type}
            placeholder={index === 0 ? placeholder : 'Display Text'}
            zSchemaName={item.zSchemaName}
          /> */}
      <div className="shrink-1 flex flex-col gap-1 grow">
        {Object.keys(INPUT_FEILDS).map((item, index) => (
          <input
            onChange={(e) => handleChange?.(e, categoryId)}
            key={index}
            defaultValue={
              socialMedialValue?.[item as keyof SocialMediaValueType]
            }
            name={INPUT_FEILDS[item as keyof InputFieldsType].zSchemaName}
            placeholder={index === 0 ? placeholder : 'Display Text'}
            className={clsx(
              'focus:outline-1 focus:outline-blueTheme mt-1 w-full bg-inputBgGrey placeholder:text-inputPlaceholder  border-1 rounded-md p-2 disabled:bg-inputDisabled disabled:text-slate-600',
              error?.[item as keyof SocialMediaValueType]
                ? 'border-redError'
                : 'border-borderMain'
            )}
            // value={inputValue as string}
          />
        ))}
      </div>
    </div>
  );
};

export default SocialMediaForm;
