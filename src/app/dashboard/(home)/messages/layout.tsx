'use client';

import { usePathname } from 'next/navigation';

export default function Layout({
  chats,
  chatGroup,
}: {
  chats: React.ReactNode;
  chatGroup: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="mx-auto flex h-full flex-col p-4">
      <div className="mb-5 flex flex-1 flex-row gap-4 overflow-x-scroll">
        {chatGroup}
        {chats}
      </div>
    </div>
  );
}
