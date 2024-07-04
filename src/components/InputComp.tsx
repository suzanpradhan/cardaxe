import { InputFieldProps } from '@/core/types/appTypes';
import clsx from 'clsx';
import { Eye, EyeSlash } from 'iconsax-react';
import React, { ChangeEvent, useState } from 'react';
import CreatableSelect from 'react-select/creatable';

const InputLable = ({
  zSchemaName,
  inputLabel,
}: {
  zSchemaName: string;
  inputLabel: string;
}) => (
  <label htmlFor={zSchemaName} className="pb-2">
    {inputLabel}
  </label>
);

const InputComp = ({
  getFieldProps,
  setFormikFieldValue,
  inputValue,
  error,
  inputCompType,
  inputType,
  placeholder,
  zSchemaName,
  disableInput,
  inputLabel,
  className,
  socialLinkName,
  handleChange,
  options,
}: InputFieldProps<
  | React.ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLTextAreaElement>
  | boolean
>) => {
  const [valueInput, setvalue] = useState<boolean>(false);
  const [showPassword, toggleShowPassword] = useState<boolean>(false);

  function returnInput() {
    switch (inputCompType) {
      case 'textArea': {
        return (
          <div className="flex flex-col items-stretch justify-stretch h-full">
            <label className="hover:cursor-pointer" htmlFor={zSchemaName}>
              {inputLabel}
            </label>
            <textarea
              name={zSchemaName}
              onChange={(e) => handleChange?.(e)}
              {...getFieldProps?.(zSchemaName)}
              id={zSchemaName}
              rows={4}
              placeholder={placeholder}
              defaultValue={inputValue === null ? '' : (inputValue as string)}
              className={clsx(
                'focus:outline-1 focus:outline-blueTheme p-2 mt-2 h-full bg-inputBgGrey  border-1 rounded-md w-full -mb-2',
                error ? 'border-redError' : 'border-borderMain'
              )}
            />
          </div>
        );
      }
      case 'select': {
        return (
          <div>
            <InputLable
              zSchemaName={zSchemaName}
              inputLabel={inputLabel ?? ''}
            />
            <CreatableSelect
              className={clsx(
                'mt-2 w-full bg-inputBgGrey placeholder:text-placeholder  border-1 rounded-md ',
                error ? 'border-redError' : 'border-borderMain'
              )}
              isMulti
              onChange={() => {}}
              options={options}
            />
          </div>
        );
      }
      case 'switch': {
      }
      case 'file': {
        return (
          <div>
            <InputLable
              zSchemaName={zSchemaName}
              inputLabel={inputLabel ?? ''}
            />
            <div className="">
              <label
                htmlFor={zSchemaName}
                className={clsx(
                  'truncate focus:outline-1 !h-11 focus:outline-blueTheme mt-2 block w-full bg-inputBgGrey placeholder:text-inputPlaceholder  border-1 rounded-md p-2 disabled:bg-inputDisabled disabled:text-gray-50 text-inputPlaceholder',
                  error ? 'border-redError' : 'border-borderMain'
                )}
              >
                {inputValue ?? placeholder}
              </label>
              <input
                {...getFieldProps?.(zSchemaName)}
                id={zSchemaName}
                type={inputType}
                onChange={(e) => handleChange?.(e)}
                placeholder={placeholder}
                className="hidden"
                disabled={disableInput}
                name={zSchemaName}
                value={''}
              />
            </div>
          </div>
        );
      }
      case 'normal': {
        return (
          <div className={`${className}`}>
            {inputLabel && (
              <InputLable
                zSchemaName={zSchemaName}
                inputLabel={inputLabel ?? ''}
              />
            )}
            <input
              onChange={(e) => handleChange?.(e)}
              id={zSchemaName}
              type={inputType}
              defaultValue={
                inputValue === 'null' ? undefined : (inputValue as string)
              }
              name={zSchemaName}
              {...getFieldProps?.(zSchemaName)}
              placeholder={placeholder}
              className={clsx(
                'focus:outline-1 focus:outline-blueTheme mt-1 w-full bg-inputBgGrey placeholder:text-inputPlaceholder  border-1 rounded-md p-2 disabled:bg-inputDisabled disabled:text-slate-600',
                error ? 'border-redError' : 'border-borderMain'
              )}
              // value={inputValue as string}
              disabled={disableInput}
            />
          </div>
        );
      }
      case 'color': {
        return (
          <input
            id={zSchemaName}
            type={inputType}
            placeholder={placeholder}
            defaultValue={inputValue as string}
            className="h-full w-full focus:outline-1 focus:outline-blueTheme"
            {...getFieldProps?.(zSchemaName)}
            onChange={(e) => handleChange?.(e)}
            name={zSchemaName}

            // {...register(zSchemaName, {
            //   onChange: onHandleChange,
            // })}
          />
        );
      }
      default: {
        return (
          <div className="">
            <input
              id={zSchemaName}
              type={inputType}
              placeholder={placeholder}
              {...getFieldProps?.(zSchemaName)}
              // onChange={(e) => handleChange?.(e)}
              className={clsx(
                'focus:outline-1 focus:outline-blueTheme mt-1 w-full bg-inputBgGrey placeholder:text-inputPlaceholder  border-1 rounded-md p-2 disabled:bg-inputDisabled disabled:text-slate-600',
                error ? 'border-redError' : 'border-borderMain'
              )}
              // name={zSchemaName}
              value={inputValue as string}
            />
          </div>
        );
      }
    }
  }

  if (inputType === 'password') {
    return (
      <div className="relative">
        <input
          id={zSchemaName}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          {...getFieldProps?.(zSchemaName)}
          className={clsx(
            'focus:outline-1 focus:outline-blueThememt-1 w-full bg-inputBgGrey placeholder:text-inputPlaceholder  border-1 rounded-md p-2 disabled:bg-inputDisabled disabled:text-slate-600',
            error ? 'border-redError' : 'border-borderMain'
          )}
          // {...register(zSchemaName)}
          disabled={disableInput}
        />
        <button
          className="absolute top-2 right-2 active::outline-none"
          onClick={(e) => {
            e.preventDefault();
            toggleShowPassword(!showPassword);
          }}
        >
          {showPassword ? (
            <EyeSlash size="24" className="text-gray-500" />
          ) : (
            <Eye size="24" className="text-gray-500" />
          )}
        </button>
      </div>
    );
  } else {
    return returnInput();
  }
};

export default InputComp;
