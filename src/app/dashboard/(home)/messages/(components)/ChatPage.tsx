import { cn } from '@/lib/utils';
import { useMutation, useQuery } from 'convex/react';
import { Send, Warning2 } from 'iconsax-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { api } from '../../../../../../convex/_generated/api';
import profileImage from '../../../../../../public/profile/profile.png';
import ChatCard from './ChatCard';
import ChatGroup from './ChatGroup';

export type ChatPageProps = {
  roomId: string;
  profileId: string;
};

export default function ChatPage({ roomId, profileId }: ChatPageProps) {
  const scrollableRef = useRef<HTMLDivElement | null>(null);
  const [message, setMessage] = useState('');
  const pathname = usePathname();

  const roomMembers = useQuery(api.rooms.getRoomMembers, {
    roomId: roomId,
    uuid: profileId,
  });

  const messages = useQuery(api.rooms.getMessages, { roomId: roomId });
  const groupedMessages = messages?.reduce(
    (acc: Array<Array<any>>, current) => {
      const lastArray = acc[acc.length - 1];

      if (
        lastArray &&
        lastArray[lastArray.length - 1].profile_id === current.profile_id
      ) {
        lastArray.push(current);
      } else {
        acc.push([current]);
      }

      return acc;
    },
    []
  );

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      sendMessage({
        content: message,
        profile_id: profileId,
        read: false,
        room_id: roomId,
      });
    }
  };

  useEffect(() => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
    }
  }, [groupedMessages]);

  const sendMessage = useMutation(api.rooms.sendMessage);

  return (
    <section
      className={cn(
        'flex h-full shrink grow basis-0 flex-col rounded-lg max-lg:w-[22rem]',
        pathname.endsWith('messages') ? 'max-lg:hidden' : 'max-lg:flex'
      )}
    >
      <div className="flex w-full items-center gap-4 py-2">
        <div className="relative h-12 w-12 overflow-hidden rounded-full">
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
        </div>
        <p className="flex-1 text-grayfont">{roomMembers?.[0]?.name}</p>
        <Warning2 size="28" variant="Bulk" />
      </div>
      <div className="flex flex-1 flex-col gap-4 overflow-y-hidden rounded-b-lg border-x-1 border-b-1 border-borderMain p-4">
        <div
          className="ref={scrollableRef} flex-1 overflow-y-scroll"
          ref={scrollableRef}
        >
          <div className="flex flex-col justify-end gap-4">
            {groupedMessages?.map((messages, index) => (
              <ChatGroup
                isMyChat={messages[0].profile_id === profileId}
                key={index}
              >
                {messages.map((item, index) => (
                  <ChatCard
                    key={index}
                    chatText={item.content}
                    isMyChat={item.profile_id === profileId}
                  />
                ))}
              </ChatGroup>
            ))}
          </div>
        </div>

        <div className="flex w-full items-center gap-4 overflow-hidden rounded-md border-1 border-borderMain px-2 has-[:focus]:outline has-[:focus]:outline-blueTheme">
          <textarea
            name="chat"
            id="chat"
            className="h-10 grow resize-none overflow-auto pt-2 focus:border-0 focus:outline-0"
            value={message}
            onChange={(e) => {
              e.preventDefault();
              setMessage(e.target.value);
            }}
          ></textarea>
          <button
            className="active:text-blueTheme"
            onKeyDown={(e) => handleKeyDown(e)}
            onClick={() => {
              sendMessage({
                content: message,
                profile_id: profileId,
                read: false,
                room_id: roomId,
              });
              setMessage('');
            }}
          >
            <Send
              size="28"
              variant="Bulk"
              className="rounded-sm bg-inputBgGrey p-1"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
