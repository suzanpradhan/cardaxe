'use client';
import { useQuery } from 'convex/react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { api } from '../../../../../../convex/_generated/api';

export default function Default() {
  const session = useSession();
  const roomIds = useQuery(api.rooms.getMyRoomIds, {
    uuid: session.data?.user?.id.toString() ?? '',
  });

  console.log('roomIds', roomIds);

  const [activeRoom, setActiveRoom] = useState<string | undefined>(undefined);

  useEffect(() => {
    setActiveRoom(roomIds?.[0]);
  }, [roomIds]);

  return <></>;
}
