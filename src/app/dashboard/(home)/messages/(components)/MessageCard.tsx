import { useQuery } from 'convex/react';
import Image from 'next/image';
import { api } from '../../../../../../convex/_generated/api';
import profileImage from '../../../../../../public/profile/profile.png';

export type MessageCardProps = {
  roomId: string;
  profileId: string;
};

export default function MessageCard({ roomId, profileId }: MessageCardProps) {
  const roomMembers = useQuery(api.rooms.getRoomMembers, {
    roomId: roomId,
    uuid: profileId,
  });
  const messages = useQuery(api.rooms.getMessages, { roomId: roomId });

  return (
    <>
      <span className="relative h-10 w-10 overflow-hidden rounded-full">
        <Image
          className="h-full w-full"
          src={
            roomMembers?.[0]?.avatar != null &&
            roomMembers?.[0]?.avatar != 'null'
              ? roomMembers?.[0]?.avatar
              : profileImage
          }
          alt="image"
          fill
          sizes="(max-width: 768px) 100vw, 700px"
          objectFit="cover"
        />
      </span>
      <span className="flex w-[80%] flex-1 flex-col">
        <p className="text-sm">{roomMembers?.[0]?.name}</p>
        <p className="line-clamp-1 w-full overflow-hidden truncate text-ellipsis text-xs text-grayfont">
          {messages?.at(-1)?.content ?? '--'}
        </p>
      </span>
    </>
  );
}
