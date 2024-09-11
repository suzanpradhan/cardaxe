'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Layout({
  chatRooms,
  chats,
  page,
}: {
  chatRooms: React.ReactNode;
  chats: React.ReactNode;
  page: React.ReactNode;
}) {
  const pathname = usePathname();
  const [showMessages, setShowMessage] = useState<boolean>(true);
  useEffect(() => {
    if (pathname.endsWith('messageV2')) {
      setShowMessage(false);
    } else {
      setShowMessage(true);
    }
  }, [pathname]);
  return (
    // <div>
    //   {chatRooms}
    //   {chats}
    // </div>
    <div className="mx-auto flex h-full flex-col p-4 max-lg:w-96">
      {page}
      {/* <div className="my-4 flex flex-1 flex-row gap-4 overflow-x-scroll max-lg:hidden">
        {chatRooms}
        {chats}
      </div> */}
      <div className="my-4 flex flex-1 flex-row gap-4 overflow-x-scroll">
        {!showMessages ? chatRooms : <></>}
        {showMessages ? chats : <></>}
      </div>
    </div>
  );
}
