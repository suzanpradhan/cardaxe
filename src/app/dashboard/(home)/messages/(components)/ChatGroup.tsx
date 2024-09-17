import { getMinUserName } from '@/core/utils/generalFunctions';
import { cn } from '@/lib/utils';
import { useQuery } from 'convex/react';
import Image from 'next/image';
import React from 'react';
import { api } from '../../../../../../convex/_generated/api';

export default function ChatGroup({
  children,
  isMyChat,
  roomId,
  profileId,
}: {
  children?: React.ReactNode;
  isMyChat?: boolean;
  roomId: string;
  profileId: string;
}) {
  const roomMembers = useQuery(api.rooms.getRoomMembers, {
    roomId: roomId,
    uuid: profileId,
  });
  return (
    <div className={cn('flex w-full gap-4 overflow-x-hidden')}>
      <div className="relative h-12 w-12 overflow-hidden rounded-full">
        {!isMyChat && roomMembers?.[0]?.avatar ? (
          <Image
            className="h-full w-full"
            src={
              roomMembers?.[0]?.avatar != null &&
              roomMembers?.[0]?.avatar != 'null'
                ? roomMembers?.[0]?.avatar
                : '/square_image.jpg'
            }
            alt="image"
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            objectFit="cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-inputPlaceholder/50">
            {roomMembers?.[0]?.name && (
              <h5 className="text-base font-extrabold text-white">
                {getMinUserName(roomMembers?.[0]?.name ?? '')}
              </h5>
            )}
          </div>
        )}
      </div>
      <div
        className={cn(
          'flex flex-1 flex-col gap-4',
          isMyChat ? 'items-end' : 'items-start'
        )}
      >
        {children}
      </div>
    </div>
  );
}
