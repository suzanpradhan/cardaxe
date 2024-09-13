'use client';

import { usePathname } from 'next/navigation';

export default function Layout({
  chats,
  children,
}: {
  chats: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // const [showMessages, setShowMessage] = useState<boolean>(false);
  // useEffect(() => {
  //   if (pathname.endsWith('message')) {
  //     setShowMessage(false);
  //   } else {
  //     setShowMessage(true);
  //   }
  // }, [pathname]);

  return (
    // <div>
    //   {chatRooms}
    //   {chats}
    // </div>
    <div className="mx-auto flex h-full flex-col p-4 max-lg:w-96">
      {/* {page} */}
      {/* <div className="my-4 flex flex-1 flex-row gap-4 overflow-x-scroll lg:hidden"> */}
      {/* {pathname.endsWith('message') ? children : <></>}
        {pathname.endsWith('message') ? <></> : chats} */}
      {/* </div> */}

      <div className="my-4 flex flex-1 flex-row gap-4 overflow-x-scroll">
        {children}
        {chats}
      </div>
    </div>
  );
}
