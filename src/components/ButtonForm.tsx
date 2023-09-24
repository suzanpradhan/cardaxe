import React from 'react';

type ButtonFormProps = {
  label: string;
  disableInput?: boolean;
};

const ButtonForm = ({ label, disableInput }: ButtonFormProps) => {
  return (
    <button
      type="submit"
      className="bg-blueTheme rounded-md p-2 text-white disabled:bg-componentBgGrey active:shadow-xl"
      disabled={disableInput}
    >
      {label}
    </button>
  );
};

export default ButtonForm;
