import clsx from 'clsx';
import Link from 'next/link';

interface ButtonProps {
  isHeader?: boolean;

  label: string;

  onClick?: () => void;

  href?: string;
}

const ButtonRounded = ({ isHeader, label, href }: ButtonProps) => {
  return (
    <div>
      {href && (
        <Link
          href={href}
          type="button"
          className={clsx(
            'text-base cursor-pointer rounded-full inline-block px-10 py-3 w-fit',
            isHeader
              ? 'text-black bg-transparent hover: dark:text-white hover:ring-black hover:ring-1 active:bg-black active:shadow-xl active:text-white'
              : 'text-white bg-blue-600 shadow-xl dark:bg-blue-700 active:ring-black active:ring-1'
          )}
        >
          {label}
        </Link>
      )}
    </div>
  );
};

export default ButtonRounded;
