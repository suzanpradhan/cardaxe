import Image from 'next/image';
import Link from 'next/link';
import staticLogoImage from '../../../public/logo.png';
import image1 from '../../../public/staticImages/1.jpg';
import image2 from '../../../public/staticImages/2.jpg';
import image3 from '../../../public/staticImages/3.jpg';
import image4 from '../../../public/staticImages/4.jpg';
import image5 from '../../../public/staticImages/5.jpg';
import Imageoverlay from './Imageoverlay';

type MyTeamsCardPropsType = {
  organizationName?: string;
  slug: string;
  logo?: string;
};

const MyTeamsCard = ({
  organizationName,
  logo,
  slug,
}: MyTeamsCardPropsType) => {
  return (
    <Link
      href={`/dashboard/teams/${slug}`}
      className="relative max-w-3xl grow rounded-lg border-1 border-borderMain"
    >
      <div
        className="absolute top-0 h-10 w-full rounded-t-lg"
        style={{ backgroundColor: 'red' }}
      ></div>
      <div className="grid gap-2 p-4">
        <div className="relative h-20 w-20 rounded-lg shadow-lg">
          <Image
            src={logo ?? staticLogoImage}
            alt="Background Image"
            fill
            objectFit="cover"
            sizes="(max-width: 768px) 100vw, 300px"
            className="z-10 rounded-lg"
          />
        </div>
        <div className="flex justify-between">
          <strong>{organizationName}</strong>
          <span>Active</span>
        </div>
        <Imageoverlay images={[image1, image2, image3, image4, image5]} />
      </div>
    </Link>
  );
};

export default MyTeamsCard;
