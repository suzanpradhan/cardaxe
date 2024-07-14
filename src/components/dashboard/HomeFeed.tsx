import { PostType } from '@/app/module';
import { Bookmark, Flash, Heart, MoreSquare, Share } from 'iconsax-react';
import Image from 'next/image';
import square_image from '../../../public/square_image.jpg';
import CardTemplateHome from './CardTempHome';

type HomeFeedType = {
  post: PostType;
};

const HomeFeed = ({ post }: HomeFeedType) => {
  const reactions = [
    {
      icon: <Heart size="24" variant="TwoTone" />,
      number: post.likes,
    },
    {
      icon: <Flash size="24" variant="TwoTone" />,
      number: post.comments,
    },
    {
      icon: <Share size="24" variant="TwoTone" />,
      number: post.shares,
    },
  ];

  return (
    <div className="min-w-[20rem] max-w-xs sm:min-w-[24rem] sm:max-w-sm w-full mx-auto flex flex-col gap-4 border-b border-zinc-100 py-5 px-2 xs:px-0">
      <section className="flex items-center gap-2">
        <div className="relative h-8 w-8 rounded-full z-auto">
          <Image
            className="rounded-full"
            src={square_image}
            alt="image"
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            objectFit="contain"
          />
        </div>
        <a className="hover:text-blueTheme font-semibold grow">Eugene Cheng</a>
        <MoreSquare
          size="24"
          className="text-zinc-200"
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
      <section className="flex gap-4">
        {reactions.map((item, index) => (
          <button
            key={index}
            className="flex gap-2 items-center hover:text-zinc-900 active:ring-2 active:text-zinc-900 active:bg-blueBg rounded-xl text-zinc-400 p-1"
          >
            <p>{item?.icon}</p>
            <p>{item?.number}</p>
          </button>
        ))}
        <div className="grow flex justify-end">
          <Bookmark
            variant="TwoTone"
            size="24"
            className="text-zinc-300 hover:text-zinc-900 active:ring-2 active:text-zinc-900 active:bg-blueBg"
          />
        </div>
      </section>
    </div>
  );
};

export default HomeFeed;
