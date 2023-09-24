import React from 'react';
import Image from 'next/image';
import square_image from '../../../public/square_image.jpg';

const user = {
  firstName: 'Sujan',
  lastName: ' Pradhan',
  plan: 'Free Plan',
};

const UserProfileCard = () => {
  return (
    <div className="max-w-lg grid-cols-2  p-3 bg-componentBgGrey flex gap-4 items-center border-1 border-borderMain rounded-md ">
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
        <h2 className="font-medium">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-grayfont">{user.plan}</p>
      </div>
    </div>
  );
};

export default UserProfileCard;
