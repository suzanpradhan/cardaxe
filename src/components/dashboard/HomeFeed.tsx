import { PostType } from '@/app/module';
import { Bookmark, Flash, Heart, MoreSquare, Share } from 'iconsax-react';
import Image from 'next/image';
import square_image from '../../../public/square_image.jpg';
import CardLayout from './CardLayout';

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
    <div className="mx-auto flex w-full min-w-[20rem] max-w-xs flex-col gap-4 border-b border-zinc-100 px-2 py-5 xs:px-0 sm:min-w-[24rem] sm:max-w-sm">
      <section className="flex items-center gap-2">
        <div className="relative z-auto h-8 w-8 rounded-full">
          <Image
            className="rounded-full"
            src={square_image}
            alt="image"
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            objectFit="contain"
          />
        </div>
        <a className="grow font-semibold hover:text-blueTheme">Eugene Cheng</a>
        <MoreSquare size="24" className="text-zinc-200" />
      </section>

      <CardLayout />

      <section className="flex gap-4">
        {reactions.map((item, index) => (
          <button
            key={index}
            className="flex items-center gap-2 rounded-xl p-1 text-zinc-400 hover:text-zinc-900 active:bg-blueBg active:text-zinc-900 active:ring-2"
          >
            <p>{item?.icon}</p>
            <p>{item?.number}</p>
          </button>
        ))}
        <div className="flex grow justify-end">
          <Bookmark
            variant="TwoTone"
            size="24"
            className="text-zinc-300 hover:text-zinc-900 active:bg-blueBg active:text-zinc-900 active:ring-2"
          />
        </div>
      </section>
    </div>
  );
};

export default HomeFeed;
