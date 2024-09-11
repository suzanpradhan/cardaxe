import { InputFieldProps } from '@/core/types/appTypes';
import { cn } from '@/lib/utils';
import { Eye, EyeSlash } from 'iconsax-react';
import React, { ChangeEvent, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { Switch } from '../ui/switch';
import InputLable from './InputLabel';

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
          <div className="flex h-full w-full flex-col items-start">
            <InputLable htmlFor={zSchemaName} inputLabel={inputLabel ?? ''} />
            <div className="h-full w-full">
              <textarea
                name={zSchemaName}
                onChange={(e) => handleChange?.(e)}
                {...getFieldProps?.(zSchemaName)}
                id={zSchemaName}
                placeholder={placeholder}
                value={(inputValue as string) ?? ''}
                defaultValue={inputValue === null ? '' : (inputValue as string)}
                className={cn(
                  'h-full w-full rounded-md border-1 bg-inputBgGrey px-2 focus:outline-1 focus:outline-blueTheme',
                  error ? 'border-redError' : 'border-borderMain'
                )}
              />
            </div>
          </div>
        );
      }
      case 'select': {
        return (
          <div className="flex h-full w-full flex-col items-start gap-2">
            <InputLable htmlFor={zSchemaName} inputLabel={inputLabel ?? ''} />
            <CreatableSelect
              className={cn(
                'placeholder:text-placeholder w-full rounded-md border-1 bg-inputBgGrey',
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
        return (
          <div className="flex justify-between">
            <label
              className="inline-block pl-[0.15rem] hover:cursor-pointer"
              htmlFor={zSchemaName}
            >
              {inputLabel}
            </label>
            <Switch
              // defaultChecked={inputValue as boolean}
              checked={inputValue as boolean}
              onCheckedChange={(checked) => handleChange?.(checked)}
            />
            {/* <input
              className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-blueTheme checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-blueTheme checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-blueTheme checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-blueTheme dark:checked:after:bg-blueTheme dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
              type={inputType}
              role="switch"
              name={zSchemaName}
              onChange={(e) => {
                const event = {
                  ...e,
                  target: {
                    ...e.target,
                    value: !inputValue as unknown as string,
                    name: zSchemaName,
                    // type: inputType,
                  },
                };
                // handleChange?.(event);
              }}
              id={zSchemaName}
              aria-checked="true"
              value={inputValue?.toString()}
              {...getFieldProps?.(zSchemaName)}
            /> */}
          </div>
        );
      }
      case 'file': {
        return (
          <div className="w-full">
            <InputLable htmlFor={zSchemaName} inputLabel={inputLabel ?? ''} />

            <label
              htmlFor={zSchemaName}
              className={cn(
                'line-clamp-1 block !h-11 w-full truncate rounded-md border-1 bg-inputBgGrey p-2 text-inputPlaceholder placeholder:text-inputPlaceholder focus:outline-1 focus:outline-blueTheme disabled:bg-inputDisabled disabled:text-gray-50',
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
        );
      }
      case 'normal': {
        return (
          <div className={`${className}`}>
            {inputLabel && (
              <InputLable htmlFor={zSchemaName} inputLabel={inputLabel ?? ''} />
            )}
            <input
              onChange={(e) => handleChange?.(e)}
              id={zSchemaName}
              type={inputType}
              defaultValue={
                inputValue === 'null' ? undefined : (inputValue as string)
              }
              name={zSchemaName}
              value={(inputValue as string) ?? ''}
              {...getFieldProps?.(zSchemaName)}
              placeholder={placeholder}
              className={cn(
                'mt-1 w-full rounded-md border-1 bg-inputBgGrey p-2 placeholder:text-inputPlaceholder focus:outline-1 focus:outline-blueTheme disabled:bg-inputDisabled disabled:text-slate-600',
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
          <div className="flex h-full w-full flex-col items-start gap-2">
            <input
              id={zSchemaName}
              type={inputType}
              placeholder={placeholder}
              {...getFieldProps?.(zSchemaName)}
              // onChange={(e) => handleChange?.(e)}
              className={cn(
                'w-full rounded-md border-1 bg-inputBgGrey p-2 placeholder:text-inputPlaceholder focus:outline-1 focus:outline-blueTheme disabled:bg-inputDisabled disabled:text-slate-600',
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
          className={cn(
            'focus:outline-blueThememt-1 w-full rounded-md border-1 bg-inputBgGrey p-2 placeholder:text-inputPlaceholder focus:outline-1 disabled:bg-inputDisabled disabled:text-slate-600',
            error ? 'border-redError' : 'border-borderMain'
          )}
          // {...register(zSchemaName)}
          disabled={disableInput}
        />
        <button
          className="active::outline-none absolute right-2 top-2"
          type="button"
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
