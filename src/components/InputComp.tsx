import { CardState } from '@/app/GlobalRedux/Features/cardSlice';
import { RootState } from '@/core/redux/store';
import { InputFieldProps } from '@/core/types/appTypes';
import clsx from 'clsx';
import { Eye, EyeSlash } from 'iconsax-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
}: InputFieldProps) => {
  const [showPassword, toggleShowPassword] = useState<boolean>(false);
  const dispatch = useDispatch();
  const cardState: CardState = useSelector((state: RootState) => state.card);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    toggleShowPassword(!showPassword);
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log('inoutchange');
    handleChange?.(e);
  };

  function returnInput() {
    switch (inputCompType) {
      case 'textArea': {
        return (
          <div className="h-full">
            <label
              className="inline-block pl-[0.15rem] hover:cursor-pointer"
              htmlFor={zSchemaName}
            >
              {inputLabel}
            </label>
            <div className="h-full">
              <textarea
                id={zSchemaName}
                {...getFieldProps?.(zSchemaName)}
                name={zSchemaName}
                onChange={(e) => handleChange?.(e)}
                // onChange={(e) => handleTextChange(e)}
                value={inputValue}
                className="focus:outline-1 focus:outline-blueTheme p-2 mt-2 h-full bg-inputBgGrey border-borderMain border-1 rounded-md w-full -mb-2"
              />
            </div>
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
              className="mt-2 w-full bg-inputBgGrey placeholder:text-placeholder border-borderMain border-1 rounded-md "
              isMulti
              onChange={() => {}}
              options={options}
            />
          </div>
        );
      }
      case 'switch': {
        return (
          <div className="flex justify-between">
            <label
              className="inline-block pl-[0.15rem] hover:cursor-pointer"
              htmlFor={zSchemaName}
            >
              {inputLabel}
            </label>
            <input
              className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-blueTheme checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-blueTheme checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-blueTheme checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-blueTheme dark:checked:after:bg-blueTheme dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
              type={inputType}
              role="switch"
              onChange={(e) => handleChange?.(e)}
              id={zSchemaName}
              aria-checked="true"
              {...getFieldProps?.(zSchemaName)}
            />
          </div>
        );
      }
      case 'file': {
        return (
          <div>
            <InputLable
              zSchemaName={zSchemaName}
              inputLabel={inputLabel ?? ''}
            />
            <div className="h-42">
              <label
                htmlFor={zSchemaName}
                className={clsx(
                  'truncate focus:outline-1 focus:outline-blueTheme mt-2 block w-full bg-inputBgGrey placeholder:text-inputPlaceholder border-borderMain border-1 rounded-md p-2 disabled:bg-inputDisabled disabled:text-gray-50 text-inputPlaceholder'
                )}
              >
                {cardState.designForm[
                  zSchemaName as keyof CardState['designForm']
                ]
                  ? cardState.designForm[
                      zSchemaName as keyof CardState['designForm']
                    ]
                  : placeholder}
              </label>
              <input
                {...getFieldProps?.(zSchemaName)}
                id={zSchemaName}
                type={inputType}
                onChange={(e) => handleChange?.(e)}
                placeholder={placeholder}
                className="hidden"
                disabled={disableInput}
              />
            </div>
          </div>
        );
      }
      case 'normal': {
        return (
          <div className={className}>
            {inputLabel && (
              <InputLable
                zSchemaName={zSchemaName}
                inputLabel={inputLabel ?? ''}
              />
            )}
            <input
              name={zSchemaName}
              onChange={(e) => handleInputChange(e)}
              id={zSchemaName}
              type={inputType}
              placeholder={placeholder}
              className={clsx(
                'focus:outline-1 focus:outline-blueTheme mt-1 w-full bg-inputBgGrey placeholder:text-inputPlaceholder border-borderMain border-1 rounded-md p-2 disabled:bg-inputDisabled disabled:text-slate-600'
              )}
              // {...getFieldProps?.(zSchemaName)}
              value={inputValue}
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
            className="h-full w-full focus:outline-1 focus:outline-blueTheme"
            {...getFieldProps?.(zSchemaName)}
            onChange={(e) => handleChange?.(e)}
            // {...register(zSchemaName, {
            //   onChange: onHandleChange,
            // })}
          />
        );
      }
      default: {
        return (
          <input
            id={zSchemaName}
            type={inputType}
            placeholder={placeholder}
            {...getFieldProps?.(zSchemaName)}
            onChange={(e) => handleChange?.(e)}
            className={clsx(
              'focus:outline-1 focus:outline-blueTheme mt-1 w-full bg-inputBgGrey placeholder:text-inputPlaceholder border-borderMain border-1 rounded-md p-2 disabled:bg-inputDisabled disabled:text-slate-600'
            )}
            // {...register(zSchemaName)}
            // disabled={disableInput}
          />
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
            'focus:outline-1 focus:outline-blueThememt-1 w-full bg-inputBgGrey placeholder:text-inputPlaceholder border-borderMain border-1 rounded-md p-2 disabled:bg-inputDisabled disabled:text-slate-600'
          )}
          // {...register(zSchemaName)}
          disabled={disableInput}
        />
        <button
          className="absolute top-2 right-2"
          onClick={(e) => handleClick(e)}
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
