import clsx from 'clsx';

interface ChatCardProps {
  isMyChat: boolean;
  chatText: string;
}

export default function ChatCard({ isMyChat, chatText }: ChatCardProps) {
  return (
    <div
      className={clsx(
        'rounded-md p-4 shadow-md',
        isMyChat
          ? 'max-w-[85%] bg-blueTheme text-right text-white'
          : 'bg-white text-left'
      )}
    >
      {chatText}
    </div>
  );
}
