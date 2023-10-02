import clsx from 'clsx';
import React from 'react';

type ButtonFormProps = {
  label: string;
  bluebackground?: boolean;
  disableInput?: boolean;
  handleClick?: () => void;
};

const ButtonForm = ({
  label,
  disableInput,
  bluebackground,
  handleClick,
}: ButtonFormProps) => {
  return (
    <button
      onClick={handleClick}
      role="link"
      type="submit"
      className={clsx(
        'w-full rounded-md p-2 disabled:bg-componentBgGrey active:shadow-xl',
        bluebackground
          ? 'bg-blueTheme text-white'
          : 'bg-transparent text-blueTheme border-1 border-blueTheme'
      )}
      disabled={disableInput}
    >
      {label}
    </button>
  );
};

export default ButtonForm;
