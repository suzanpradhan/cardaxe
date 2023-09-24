import React from 'react';
import Image from 'next/image';
import square_image from '../../../public/square_image.jpg';
import { Bookmark, Flash, Heart, MoreSquare, Share } from 'iconsax-react';
import CardTemplateHome from './CardTempHome';
import { PostType } from '@/app/module';

type HomeFeedType = {
  post: PostType;
};

const HomeFeed = ({ post }: HomeFeedType) => {
  const reactions = [
    {
      icon: <Heart size="30" variant="Bulk" />,
      number: post.likes,
    },
    {
      icon: <Flash size="30" variant="Bulk" />,
      number: post.comments,
    },
    {
      icon: <Share size="30" variant="Bold" />,
      number: post.shares,
    },
  ];

  return (
    <div className="flex flex-col gap-4 w-max border-b-1 border-componentBgGrey pb-4">
      <section className="flex items-center gap-2">
        <div className="relative h-8 w-8 rounded-full">
          <Image
            className="rounded-full"
            //   square image should be replaced with the profile picture of individual user in database
            src={square_image}
            alt="image"
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            objectFit="contain"
          />
        </div>
        <a className="hover:text-blueTheme font-semibold grow">Eugene Cheng</a>
        <MoreSquare
          size="3"
          className="text-grayfont hover:text-blueTheme bg-componentBgGrey rounded-lg hover:bg-blueBg"
        />
      </section>
      <CardTemplateHome
        firstName={post.firstName}
        lastName={post.lastName}
        designation={post.designation}
        email={post.email}
        logo={post.logo}
        phone={post.phone}
        website={post.website}
      />
      <section className="flex gap-8">
        {reactions.map((item, index) => (
          <button
            key={index}
            className="flex gap-2 items-center hover:text-blueTheme active:ring-2 active:text-blueTheme active:bg-blueBg  rounded-xl text-grayfont p-1"
          >
            <p>{item?.icon}</p>
            <p>{item?.number}</p>
          </button>
        ))}
        <div className="grow flex justify-end">
          <Bookmark
            variant="Bold"
            size="30"
            className="text-grayfont hover:text-blueTheme active:ring-2 active:text-blueTheme active:bg-blueBg"
          />
        </div>
      </section>
    </div>
  );
};

export default HomeFeed;
