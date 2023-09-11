import clsx from 'clsx';
import React, { useState } from 'react';
import { InputFieldProps } from '@/types/appTypes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import {
  CardState,
  updateContentForm,
  updateDesignForm,
  updateInfosForm,
} from '@/app/GlobalRedux/Features/cardSlice';
import { Eye, EyeSlash } from 'iconsax-react';

const InputComp = ({
  inputCompType,
  inputType,
  placeholder,
  register,
  zSchemaName,
  disableInput,
  inputLabel,
  className,
}: InputFieldProps) => {
  const [showPassword, toggleShowPassword] = useState<boolean>(false);
  const dispatch = useDispatch();
  const cardState: CardState = useSelector((state: RootState) => state.card);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    toggleShowPassword(!showPassword);
  };

  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    const stateValue =
      type === 'file' && files ? window.URL.createObjectURL(files[0]) : value;

    if (Object.prototype.hasOwnProperty.call(cardState.contentForm, name)) {
      const updatedFormState: CardState['contentForm'] = {
        ...cardState.contentForm,
        [name]: stateValue,
      };
      dispatch(updateContentForm(updatedFormState));
    } else if (
      Object.prototype.hasOwnProperty.call(cardState.designForm, name)
    ) {
      const updatedFormState: CardState['designForm'] =
        name !== 'backgroundColor'
          ? {
              ...cardState.designForm,
              [name]: stateValue,
            }
          : {
              ...cardState.designForm,
              [name]: stateValue,
              backgroundImage: null,
            };
      dispatch(updateDesignForm(updatedFormState));
    } else if (
      Object.prototype.hasOwnProperty.call(cardState.infosForm, name)
    ) {
      const updatedFormState: CardState['infosForm'] = {
        ...cardState.infosForm,
        [name]: stateValue,
      };
      dispatch(updateInfosForm(updatedFormState));
    }
  };

  let inputComp: React.JSX.Element | undefined = undefined;

  if (inputCompType === 'textArea') {
    inputComp = (
      <div>
        <label htmlFor={zSchemaName} className="pb-2">
          {inputLabel}
        </label>
        <div>
          <textarea
            id={zSchemaName}
            {...register(zSchemaName, {
              onChange: onHandleChange,
            })}
            className="h-full bg-inputBgGrey border-inputBorder border-1 rounded-md w-full"
          />
        </div>
      </div>
    );
  } else if (inputCompType === 'select') {
    inputComp = (
      <div>
        <label htmlFor={zSchemaName} className="pb-2">
          {inputLabel}
        </label>
        <select
          id={zSchemaName}
          className="mt-2 w-full bg-inputBgGrey placeholder:text-placeholder border-inputBorder border-1 rounded-md p-2"
          {...register(zSchemaName, {
            onChange: onHandleChange,
          })}
        >
          <option value={''}>--Please select option--</option>
          <option value={'option1'}>Option 1</option>
          <option value={'option2'}>Option 2</option>
          <option value={'option5'}>Option 5</option>
        </select>
      </div>
    );
  } else if (inputCompType === 'switch') {
    inputComp = (
      <div className="flex justify-between">
        <label
          className="inline-block pl-[0.15rem] hover:cursor-pointer"
          htmlFor={zSchemaName}
        >
          {inputLabel}
        </label>
        <input
          className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
          type={inputType}
          role="switch"
          id={zSchemaName}
          aria-checked="true"
          {...register(zSchemaName, {
            onChange: onHandleChange,
          })}
        />
      </div>
    );
  } else if (inputCompType === 'file') {
    inputComp = (
      <div>
        {inputLabel && (
          <label htmlFor={zSchemaName} className="pb-2">
            {inputLabel}
          </label>
        )}

        <div className="h-42">
          <label
            htmlFor={zSchemaName}
            className={clsx(
              'mt-2 block w-full bg-inputBgGrey placeholder:text-inputPlaceholder border-borderMain border-1 rounded-md p-2 disabled:bg-inputDisabled disabled:text-gray-50'
            )}
          >
            {placeholder}
          </label>
          <input
            id={zSchemaName}
            type={inputType}
            placeholder={placeholder}
            className="hidden"
            required
            {...register(zSchemaName, {
              onChange: onHandleChange,
            })}
            disabled={disableInput}
          />
        </div>
      </div>
    );
  } else if (inputCompType === 'normal') {
    inputComp = (
      <div className={className}>
        {inputLabel && (
          <label htmlFor={zSchemaName} className="pb-2">
            {inputLabel}
          </label>
        )}
        <input
          id={zSchemaName}
          type={inputType}
          placeholder={placeholder}
          className={clsx(
            'mt-1 w-full bg-inputBgGrey placeholder:text-inputPlaceholder border-borderMain border-1 rounded-md p-2 disabled:bg-inputDisabled disabled:text-slate-600'
          )}
          {...register(zSchemaName, {
            onChange: onHandleChange,
          })}
          disabled={disableInput}
        />
      </div>
    );
  } else if (inputCompType === 'color') {
    inputComp = (
      <input
        id={zSchemaName}
        type={inputType}
        placeholder={placeholder}
        className="h-full w-full"
        {...register(zSchemaName, {
          onChange: onHandleChange,
        })}
      />
    );
  } else if (inputType === 'password') {
    inputComp = (
      <div className="relative">
        <input
          id={zSchemaName}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          className={clsx(
            'mt-1 w-full bg-inputBgGrey placeholder:text-inputPlaceholder border-borderMain border-1 rounded-md p-2 disabled:bg-inputDisabled disabled:text-slate-600'
          )}
          {...register(zSchemaName)}
          disabled={disableInput}
        />
        <button
          className="absolute top-3 right-2"
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
    inputComp = (
      <input
        id={zSchemaName}
        type={inputType}
        placeholder={placeholder}
        className={clsx(
          'mt-1 w-full bg-inputBgGrey placeholder:text-inputPlaceholder border-borderMain border-1 rounded-md p-2 disabled:bg-inputDisabled disabled:text-slate-600'
        )}
        {...register(zSchemaName)}
        disabled={disableInput}
      />
    );
  }

  return inputComp;
};

export default InputComp;
