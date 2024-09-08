import { cn } from '@/lib/utils';
import Image, { StaticImageData } from 'next/image';

interface Props {
  clientName: string;
  clientPosition: string;
  clientView: string;
  clientPic: StaticImageData;
  isSelected: Boolean;
}

const ClientsOpinion = ({
  clientView,
  clientPosition,
  clientName,
  clientPic,
  isSelected,
}: Props) => {
  return (
    <div
      className={cn(
        isSelected && 'scale-150',
        'flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 bg-white px-3 py-2 text-black',
        'swiper-slide'
      )}
    >
      <p className="max-h-52 text-ellipsis text-left">{clientView}</p>
      <div className={cn('flex gap-2 pt-3', 'clientImageDescriptionClass')}>
        <div className="relative h-12 w-12 rounded-full">
          <Image
            src={clientPic}
            alt="image"
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            objectFit="cover"
            className={cn('rounded-full', 'imageClass')}
          />
        </div>
        <div className={cn('text-left', 'clientDescriptionClass')}>
          <h4 className="font-bold">{clientName}</h4>
          <p className="">{clientPosition}</p>
        </div>
      </div>
    </div>
  );
};

export default ClientsOpinion;
