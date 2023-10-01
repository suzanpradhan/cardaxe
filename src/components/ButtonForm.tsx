import clsx from 'clsx';
import React from 'react';

type ButtonFormProps = {
  label: string;
  bluebackground?: boolean;
  disableInput?: boolean;
};

const ButtonForm = ({
  label,
  disableInput,
  bluebackground,
}: ButtonFormProps) => {
  return (
    <button
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
