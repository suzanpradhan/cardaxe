import clsx from 'clsx';
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
          className={clsx(
            'text-sm md:text-base cursor-pointer rounded-full inline-block px-10 py-[10px] w-fit',
            classNames && classNames,
            isHeader
              ? 'text-black bg-transparent  dark:text-white hover:ring-black hover:ring-2 active:bg-black active:shadow-xl active:text-white'
              : 'text-white bg-blueTheme shadow-xl dark:bg-blueTheme active:ring-black active:ring-1'
          )}
        >
          {label}
        </Link>
      )}
    </div>
  );
};

export default ButtonRounded;
