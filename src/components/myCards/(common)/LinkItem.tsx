import { ArrowRight2 } from 'iconsax-react';
import Image from 'next/image';
import Link from 'next/link';
import { LinkDataType } from '../AdditionalLinks';

const LinkItem = ({ item }: { item: LinkDataType }) => {
  return (
    <Link href={item.url} target="_blank">
      <div className="flex items-center justify-between rounded-md bg-zinc-100 px-3 py-3">
        <div className="flex items-center gap-2">
          <div className="relative aspect-square w-7 overflow-hidden rounded-sm md:w-9">
            <Image
              src={item?.icon ? item.icon : '/profile/profile.png'}
              alt={item?.name ? item.name : 'link_icon'}
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              objectFit="cover"
            />
          </div>
          <h3 className="text-sm font-bold">{item?.name}</h3>
        </div>
        <ArrowRight2 size={21} variant="TwoTone" className="text-zinc-500" />
      </div>
    </Link>
  );
};

export default LinkItem;
