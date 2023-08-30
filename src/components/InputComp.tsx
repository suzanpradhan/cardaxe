import clsx from 'clsx';
import { type } from 'os';
import React from 'react';

type InputCompProps = {
  inputType: string;
  placeholder?: string;
  register: any;
  name: any;
  disableInput?: boolean;
  inputLabel?: string;
};

const InputComp = ({
  inputType,
  placeholder,
  register,
  name,
  disableInput,
  inputLabel,
}: InputCompProps) => {
  return (
    <div>
      {inputLabel && (
        <label htmlFor={name} className="pb-2">
          {inputLabel}
        </label>
      )}
      {name === 'logo' ? (
        inputLabel && (
          <>
            <label
              htmlFor={name}
              className={clsx(
                'mt-2 block w-full bg-input placeholder:text-inputPlaceholder border-borderMain border-1 rounded-md p-2 disabled:bg-inputDisabled disabled:text-gray-50'
              )}
            >
              {placeholder}
            </label>
            <input
              id={name}
              type={inputType}
              placeholder={placeholder}
              className="hidden"
              required
              {...register(name)}
              disabled={disableInput}
            ></input>
          </>
        )
      ) : (
        <input
          id={name}
          type={inputType}
          placeholder={placeholder}
          className="mt-1 w-full bg-input placeholder:text-inputPlaceholder border-borderMain border-1 rounded-md p-2 disabled:bg-inputDisabled disabled:text-slate-600"
          required
          {...register(name)}
          disabled={disableInput}
        ></input>
      )}
    </div>
  );
};

export default InputComp;
