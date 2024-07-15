import { ArrowRight2 } from 'iconsax-react';
import Image from 'next/image';
import { LinkDataType } from '../AdditionalLinks';

const LinkItem = ({ item }: { item: LinkDataType }) => {
  return (
    <div className="flex items-center justify-between rounded-md bg-zinc-100 px-3 py-3">
      <div className="flex items-center gap-2">
        <div className="relative aspect-square w-9 overflow-hidden rounded-sm">
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
      <ArrowRight2 size={24} variant="TwoTone" />
    </div>
  );
};

export default LinkItem;
