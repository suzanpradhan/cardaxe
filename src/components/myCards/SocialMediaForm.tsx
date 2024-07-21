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
};

const INPUT_FEILDS: InputFieldsType = {
  url: {
    type: 'url',
    zSchemaName: 'url',
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
    <div className="mb-4 flex flex-wrap gap-2">
      {/* <p className="shrink-0 basis-full text-sm font-medium">
        {socialLinkTitle}
      </p> */}
      <div className="flex w-full items-start justify-stretch gap-2">
        <div className="w-10 shrink-0 rounded-sm bg-slate-50 p-1 shadow-md">
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
        <div className="flex w-full grow flex-col gap-2">
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
                'h-10 w-full rounded-md border-1 bg-inputBgGrey px-2 placeholder:text-inputPlaceholder focus:outline-1 focus:outline-blueTheme disabled:bg-inputDisabled disabled:text-slate-600',
                error?.[item as keyof SocialMediaValueType]
                  ? 'border-redError'
                  : 'border-borderMain'
              )}
              // value={inputValue as string}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaForm;
