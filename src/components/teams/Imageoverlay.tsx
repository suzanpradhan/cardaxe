import { apiPaths } from '@/core/api/apiConstants';
import Image from 'next/image';
import profileImage from '../../../public/profile/profile.png';

type ImageoverlayPropsType = {
  images: Array<string | undefined>;
};

const Imageoverlay = ({ images }: ImageoverlayPropsType) => {
  let imageCount: number = 0;
  const imageList = images?.slice(0, 5).map((image, index) => image);
  console.log(imageList);
  return (
    <div className="flex h-10">
      {imageList?.map((item, index) => {
        let position: number = imageCount * 25;
        let positionToString: string = position.toString() + 'px';
        imageCount += 1;

        return (
          <div key={index} className="absolute h-10 w-10 rounded-full">
            <Image
              fill
              objectFit="cover"
              src={item ? apiPaths.serverUrl + item : profileImage}
              sizes="(max-width: 768px) 100vw, 300px"
              alt="image"
              className="rounded-full"
              style={{ left: positionToString }}
            />
          </div>
        );
      })}
      {images?.length > 5 ? (
        <div
          className="absolute h-10 w-10 rounded-full bg-componentBgGrey pl-[0.35rem] pt-[0.6rem] text-sm text-grayfont"
          style={{ left: '140px' }}
        >
          +{images?.length - imageList?.length}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Imageoverlay;
