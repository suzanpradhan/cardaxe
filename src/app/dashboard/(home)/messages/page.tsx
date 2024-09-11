'use client';

import SearchInput from '@/components/SearchInput';
import { cn } from '@/lib/utils';
import { useQuery } from 'convex/react';
import { Setting2 } from 'iconsax-react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { api } from '../../../../../convex/_generated/api';
import ChatPage from './(components)/ChatPage';
import MessageCard from './(components)/MessageCard';

const MessagePage = () => {
  const session = useSession();

  const roomIds = useQuery(api.rooms.getMyRoomIds, {
    uuid: session.data?.user?.id.toString() ?? '',
  });

  const [activeRoom, setActiveRoom] = useState<string | undefined>(undefined);

  useEffect(() => {
    setActiveRoom(roomIds?.[0]);
  }, [roomIds]);

  //  const members = useQuery(api.rooms.getMyRoomMembers, {
  //   uuid: session.data?.user?.id.toString() ?? '',
  // });

  return (
    <div className="mx-auto flex h-full flex-col p-4 max-lg:w-96">
      <h3 className="mb-5 block text-xl font-semibold max-lg:hidden">
        Message
      </h3>
      <div className="my-4 flex flex-1 flex-row gap-4 overflow-x-scroll">
        <aside className="flex h-full max-w-md shrink-0 basis-80 flex-col gap-4 lg:basis-110">
          <div className="flex w-full gap-2">
            <span className="">Inbox</span>
            <span className="m-0 flex flex-1 items-center p-0">
              <p className="w-12 rounded-md bg-blueBg text-center align-bottom text-xs">
                2 New
              </p>
            </span>
            <Setting2 size="24" variant="Bulk" />
          </div>
          <SearchInput greyBackground={true} requireBorder={false} />
          <ul className="flex h-full flex-col gap-4 overflow-y-scroll rounded-lg border-1 border-borderMain p-3">
            {session.data?.user?.id ? (
              roomIds?.map((item, index) => (
                <li
                  key={index}
                  className={cn(
                    'flex items-center gap-4 rounded-md p-2',
                    activeRoom === item ? 'bg-blueBg' : ''
                  )}
                  onClick={() => setActiveRoom(item)}
                  role="button"
                >
                  <MessageCard
                    roomId={item}
                    profileId={session.data.user!.id!.toString()}
                  />
                </li>
              ))
            ) : (
              <></>
            )}
          </ul>
        </aside>
        {session.data?.user?.id.toString() && activeRoom ? (
          <ChatPage
            profileId={session.data?.user?.id.toString()}
            roomId={activeRoom}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default MessagePage;
