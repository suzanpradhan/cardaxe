'use client';

import { cn } from '@/lib/utils';
import { usePathname } from 'next/dist/client/components/navigation';

export default function Default() {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        'flex h-full w-full grow items-center justify-center',
        pathname.endsWith('messages') ? 'max-lg:hidden' : 'max-lg:flex'
      )}
    >
      Create New Message
    </div>
  );
}
