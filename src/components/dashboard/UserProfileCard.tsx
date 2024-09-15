import Image from 'next/image';
import square_image from '../../../public/square_image.jpg';

interface UserProfileCardProps {
  fullName: string;
  avatar?: string;
}

const UserProfileCard = ({ fullName, avatar }: UserProfileCardProps) => {
  return (
    <div className="flex w-full grid-cols-2 items-center gap-4 rounded-md border-1 border-borderMain bg-componentBgGrey p-2">
      <div className="relative h-10 w-10 rounded-full">
        <Image
          src={avatar ?? square_image}
          alt="PP image"
          fill
          sizes="(max-width: 768px) 100vw, 700px"
          objectFit="cover"
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
