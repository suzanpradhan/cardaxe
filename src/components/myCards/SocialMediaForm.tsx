import Image, { StaticImageData } from 'next/image';
import InputComp from '../InputComp';

type SocialMediaFormProps = {
  socialLinkName: string;
  socialLinkTitle: string;
  socialLinkLogo: StaticImageData;
  placeholder: string;
};

const INPUT_FEILDS = [
  {
    type: 'text',
    zSchemaName: 'url',
  },
  {
    type: 'text',
    zSchemaName: 'displayText',
  },
];

const SocialMediaForm = ({
  socialLinkTitle,
  socialLinkName,
  socialLinkLogo,
  placeholder,
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
      <div className="shrink-1 flex flex-col gap-1 grow">
        {INPUT_FEILDS.map((item, index) => (
          <InputComp
            inputCompType="normal"
            socialLinkName={socialLinkName}
            key={index}
            // onChange={handleChange}
            inputType={item.type}
            placeholder={index === 0 ? placeholder : 'Display Text'}
            zSchemaName={item.zSchemaName}
          />
        ))}
      </div>
    </div>
  );
};

export default SocialMediaForm;
