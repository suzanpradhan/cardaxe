import Image from 'next/image';
import square_image from '../../../public/square_image.jpg';

interface UserProfileCardProps {
  fullName: string;
}

const UserProfileCard = ({ fullName }: UserProfileCardProps) => {
  return (
    <div className=" w-full grid-cols-2  p-3 bg-componentBgGrey flex gap-4 items-center border-1 border-borderMain rounded-md ">
      <div className="w-14 h-14 rounded-full relative">
        <Image
          src={square_image}
          alt="PP image"
          fill
          sizes="(max-width: 768px) 100vw, 700px"
          objectFit="contain"
          className="rounded-full"
        />
      </div>
      <div>
        <h2 className="font-medium">{fullName}</h2>
        {/* <p className="text-grayfont">{user.plan}</p> */}
      </div>
    </div>
  );
};

export default UserProfileCard;
