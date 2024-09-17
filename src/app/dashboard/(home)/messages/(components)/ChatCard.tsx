import { cn } from '@/lib/utils';

interface ChatCardProps {
  isMyChat: boolean;
  chatText: string;
}

export default function ChatCard({ isMyChat, chatText }: ChatCardProps) {
  return (
    <div
      className={cn(
        'rounded-md px-4 py-2 shadow-md',
        isMyChat
          ? 'max-w-[85%] overflow-x-hidden text-wrap bg-blueTheme text-right text-white'
          : 'bg-white text-left'
      )}
    >
      {chatText}
    </div>
  );
}
