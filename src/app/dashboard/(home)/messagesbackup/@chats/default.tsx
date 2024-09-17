'use client';

import SearchInput from '@/components/SearchInput';
import { cn } from '@/lib/utils';
import { useQuery } from 'convex/react';
import { Setting2 } from 'iconsax-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from '../../../../../../convex/_generated/api';
import MessageCard from '../../messages/(components)/MessageCard';

export default function Page() {
  const pathname = usePathname();

  const session = useSession();
  const roomIds = useQuery(api.rooms.getMyRoomIds, {
    uuid: session.data?.user?.id.toString() ?? '',
  });

  const [activeRoom, setActiveRoom] = useState<string | undefined>(undefined);

  useEffect(() => {
    setActiveRoom(roomIds?.[0]);
  }, [roomIds]);
  return (
    <aside
      className={cn(
        'flex h-full max-w-md shrink-0 basis-full flex-col gap-4 lg:basis-110',
        !pathname.endsWith('messages') ? 'max-lg:hidden' : 'max-lg:flex'
      )}
    >
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
      <ul className="flex h-full flex-col gap-4 overflow-y-scroll rounded-lg">
        {session.data?.user?.id ? (
          roomIds?.map((item, index) => (
            <li key={index} onClick={() => setActiveRoom(item)}>
              <Link
                href={`/dashboard/messages/chat/${item}`}
                className={cn(
                  'flex items-center gap-4 rounded-md p-2',
                  activeRoom === item ? 'bg-blueBg' : ''
                )}
              >
                <MessageCard
                  roomId={item}
                  profileId={session.data.user!.id!.toString()}
                />
              </Link>
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
    </aside>
  );
}
