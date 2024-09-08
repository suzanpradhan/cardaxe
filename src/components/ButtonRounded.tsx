import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ButtonProps {
  isHeader?: boolean;
  label: string | React.JSX.Element;
  onClick?: () => void;
  href?: string;
  classNames?: string;
}

const ButtonRounded = ({ isHeader, label, href, classNames }: ButtonProps) => {
  return (
    <div>
      {href && (
        <Link
          href={href}
          type="button"
          className={cn(
            'inline-block w-fit cursor-pointer rounded-full px-10 py-[10px] text-sm md:text-base',
            classNames && classNames,
            isHeader
              ? 'bg-transparent text-black hover:ring-2 hover:ring-black active:bg-black active:text-white active:shadow-xl dark:text-white'
              : 'bg-blueTheme text-white shadow-xl active:ring-1 active:ring-black dark:bg-blueTheme'
          )}
        >
          {label}
        </Link>
      )}
    </div>
  );
};

export default ButtonRounded;
