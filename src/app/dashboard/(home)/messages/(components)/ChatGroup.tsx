import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import profileImage from '../../../../../../public/profile/profile.png';

export default function ChatGroup({
  children,
  isMyChat,
}: {
  children?: React.ReactNode;
  isMyChat?: boolean;
}) {
  return (
    <div className={clsx('flex w-full gap-4')}>
      {!isMyChat ? (
        <div className="relative h-12 w-12 rounded-full">
          <Image
            className="rounded-full"
            src={profileImage}
            alt="image"
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            objectFit="contain"
          />
        </div>
      ) : (
        <></>
      )}
      <div
        className={clsx(
          'flex flex-1 flex-col gap-4',
          isMyChat ? 'items-end' : 'items-start'
        )}
      >
        {children}
      </div>
    </div>
  );
}
