import clsx from 'clsx';
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
      className={clsx(
        isSelected && 'scale-150',
        ' text-black flex flex-col gap-2 cursor-pointer border-2 px-3 py-2 rounded-lg text-',
        'swiper-slide'
      )}
    >
      <p className="text-left">{clientView}</p>
      <div className={clsx('flex gap-2 pt-3', 'clientImageDescriptionClass')}>
        <div className="w-12 h-12 rounded-full relative">
          <Image
            src={clientPic}
            alt="image"
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            objectFit="cover"
            className={clsx('rounded-full', 'imageClass')}
          />
        </div>
        <div className={clsx('text-left', 'clientDescriptionClass')}>
          <h4 className="font-bold">{clientName}</h4>
          <p>{clientPosition}</p>
        </div>
      </div>
    </div>
  );
};

export default ClientsOpinion;
