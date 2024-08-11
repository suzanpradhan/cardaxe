import SearchInput from '@/components/SearchInput';
import { Send, Setting2, Warning2 } from 'iconsax-react';
import Image from 'next/image';
import profileImage from '../../../../../public/profile/profile.png';
import ChatCard from './(components)/ChatCard';
import ChatGroup from './(components)/ChatGroup';

const page = () => {
  return (
    <div className="h-screen p-4">
      <h3 className="mb-5 text-xl font-semibold">Message</h3>
      <div className="flex h-[95%] gap-4">
        <aside className="flex h-full max-w-md shrink-0 basis-110 flex-col gap-4">
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
            {Array.from({ length: 20 }, (_, i) => (
              <li className="flex items-center gap-4" key={i}>
                <span className="relative h-10 w-10 rounded-full bg-red-600">
                  <Image
                    className="rounded-full"
                    src={profileImage}
                    alt="image"
                    fill
                    sizes="(max-width: 768px) 100vw, 700px"
                    objectFit="contain"
                  />
                </span>
                <span className="flex flex-col">
                  <p className="text-sm">Alex brooker</p>
                  <p className="text-xs text-grayfont">Very good stuff</p>
                </span>
              </li>
            ))}
          </ul>
        </aside>
        <section className="flex h-full shrink grow basis-0 flex-col rounded-lg">
          <div className="flex w-full items-center gap-4 border-x-1 border-t-1 border-inputBgGrey bg-inputBgGrey px-4 py-3">
            <div className="relative h-12 w-12 rounded-full">
              <Image
                className="rounded-full"
                src={profileImage}
                alt="image"
                fill
                sizes="(max-width: 768px) 100vw, 700px"
                objectFit="contain"
              />
            </div>
            <p className="flex-1 text-grayfont">Alex Brooker</p>
            <Warning2 size="28" variant="Bulk" />
          </div>
          <div className="flex flex-1 flex-col gap-4 overflow-y-hidden rounded-b-lg border-x-1 border-b-1 border-borderMain p-4">
            <div className="flex-1 overflow-y-scroll">
              <div className="flex flex-col justify-end gap-4">
                <ChatGroup isMyChat={false}>
                  <ChatCard chatText="Hello " isMyChat={false} />
                  <ChatCard
                    chatText="There are many variations of passages of lorem impum available variations of passages of lorem impum  of passages of lorem impum "
                    isMyChat={false}
                  />
                </ChatGroup>
                <ChatGroup isMyChat={true}>
                  <ChatCard
                    chatText="There are many variations of passages of lorem "
                    isMyChat={true}
                  />
                  <ChatCard
                    chatText="There are many variations of passages of lorem impum available variations of passages of lorem impum  of passages of lorem impum "
                    isMyChat={true}
                  />
                </ChatGroup>
                <ChatGroup isMyChat={false}>
                  <ChatCard chatText="Hello " isMyChat={false} />
                  <ChatCard
                    chatText="There are many variations of passages of lorem impum available variations of passages of lorem impum  of passages of lorem impum "
                    isMyChat={false}
                  />
                </ChatGroup>
                <ChatGroup isMyChat={true}>
                  <ChatCard
                    chatText="There are many variations of passages of lorem "
                    isMyChat={true}
                  />
                  <ChatCard
                    chatText="There are many variations of passages of lorem impum available variations of passages of lorem impum  of passages of lorem impum "
                    isMyChat={true}
                  />
                </ChatGroup>
              </div>
            </div>

            <div className="flex w-full items-center gap-4 overflow-hidden rounded-md border-1 border-borderMain px-2">
              <textarea
                name="chat"
                id="chat"
                className="grow resize-none overflow-auto"
              ></textarea>
              <Send
                size="28"
                variant="Bulk"
                className="rounded-sm bg-inputBgGrey p-1"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default page;
