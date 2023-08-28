import clsx from 'clsx';
import React from 'react';

type InputCompProps = {
  inputType: string;
  placeholder: string;
  register: any;
  name: any;
  disableInput?: boolean;
};

const InputComp = ({
  inputType,
  placeholder,
  register,
  name,
  disableInput,
}: InputCompProps) => {
  return (
    <input
      type={inputType}
      placeholder={placeholder}
      className={clsx(
        'w-full bg-input placeholder:text-placeholder border-inputBorder border-1 rounded-md p-2 disabled:bg-inputDisabled disabled:text-slate-600'
      )}
      required
      {...register(name)}
      disabled={disableInput}
    ></input>
  );
};

export default InputComp;
