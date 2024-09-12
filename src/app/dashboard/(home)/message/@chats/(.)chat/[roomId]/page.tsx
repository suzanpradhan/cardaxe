'use client';

import { useSession } from 'next-auth/react';
import ChatPage from '../../../(components)/ChatPage';

export default function Page({ params }: { params: { roomId: string } }) {
  const session = useSession();
  if (session?.data?.user) {
    return (
      <ChatPage
        profileId={session.data?.user?.id.toString()}
        roomId={params.roomId}
      />
    );
  }
  return <></>;
}
