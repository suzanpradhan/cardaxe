import clsx from 'clsx';
import { NotificationBing } from 'iconsax-react';
import Link from 'next/link';

type TitleTextProps = {
  isSideBarComp?: boolean;
};

const TitleText = ({ isSideBarComp }: TitleTextProps) => {
  return (
    <Link
      href={'/'}
      className={clsx(
        'w-full flex justify-between items-center ',
        isSideBarComp && 'sm:px-3 sm:pt-6 pt-2 px-2 mb-2 sm:mb-0'
      )}
    >
      <h1 className={clsx('sm:text-4xl text-4xl-mobile font-extrabold ')}>
        cardaxe.
      </h1>
      {isSideBarComp && (
        <NotificationBing
          size="30"
          variant="Bulk"
          className="text-grayfont sm:hidden"
        />
      )}
    </Link>
  );
};

export default TitleText;
