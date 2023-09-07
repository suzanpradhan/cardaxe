import React from 'react';
import InputComp from '../InputComp';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image, { StaticImageData } from 'next/image';

type SocialMediaFormProps = {
  socialLinkName: string;
  socialLinkTitle: string;
  socialLinkLogo: StaticImageData;
  placeholder: string;
};

const SocialsFormSchema = z.object({
  socialLink: z.string(),
  displayText: z.string().min(4, { message: 'Must be more than 4 characters' }),
});

type SocialsFormSchemaType = z.infer<typeof SocialsFormSchema>;

const INPUT_FEILDS = [
  {
    type: 'text',
    zSchemaName: 'socialLink',
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SocialsFormSchemaType>({
    resolver: zodResolver(SocialsFormSchema),
  });

  return (
    <form className="flex max-w-7xl flex-wrap p-2 gap-1">
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
            key={index}
            inputType={item.type}
            placeholder={index === 0 ? placeholder : 'Display Text'}
            register={register}
            zSchemaName={item.zSchemaName}
          />
        ))}
      </div>
    </form>
  );
};

export default SocialMediaForm;
