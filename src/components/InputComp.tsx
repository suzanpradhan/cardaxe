import clsx from 'clsx';
import React, { useState } from 'react';
import { InputFieldProps } from '@/core/types/appTypes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/core/redux/store';
import {
  CardState,
  InfosFormStateType,
  updateContentForm,
  updateDesignForm,
  updateInfosForm,
} from '@/modules/card/cardReducer';
import { Eye, EyeSlash } from 'iconsax-react';
import produce from 'immer';
import CreatableSelect from 'react-select/creatable';

const InputComp = ({
  inputCompType,
  inputType,
  placeholder,
  register,
  zSchemaName,
  disableInput,
  inputLabel,
  className,
  socialLinkName,
  options,
}: InputFieldProps) => {
  const [showPassword, toggleShowPassword] = useState<boolean>(false);
  const dispatch = useDispatch();
  const cardState: CardState = useSelector((state: RootState) => state.card);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    toggleShowPassword(!showPassword);
  };

  const commonClassNames = '';

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
      Object.prototype.hasOwnProperty.call(
        cardState.infosForm[socialLinkName as keyof CardState['infosForm']],
        name
      )
    ) {
      const updatedFormState: CardState['infosForm'] = produce(
        cardState.infosForm,
        (draft: CardState['infosForm']) => {
          draft[socialLinkName as keyof CardState['infosForm']][
            name as keyof InfosFormStateType
          ] = stateValue;
        }
      );
      console.log(cardState);
      console.log(updatedFormState);
      dispatch(updateInfosForm(updatedFormState));

      // const updatedFormState: CardState['infosForm'] = {
      //   ...cardState.infosForm,
      //   [name]: stateValue,
      // };
      // dispatch(updateInfosForm(updatedFormState));
    }
  };

  function helloworld() {
    switch (inputCompType) {
      case 'textArea': {
        return (
          <div className="h-full">
            <label htmlFor={zSchemaName} className="pb-2">
              {inputLabel}
            </label>
            <div className="h-full">
              <textarea
                id={zSchemaName}
                {...register(zSchemaName, {
                  onChange: onHandleChange,
                })}
                className="focus:outline-1 focus:outline-blueTheme p-2 mt-2 h-full bg-inputBgGrey border-borderMain border-1 rounded-md w-full -mb-2"
              />
            </div>
          </div>
        );
      }
      case 'select': {
        return (
          <div>
            <label htmlFor={zSchemaName} className="pb-2">
              {inputLabel}
            </label>
            <CreatableSelect
              className="mt-2 w-full bg-inputBgGrey placeholder:text-placeholder border-borderMain border-1 rounded-md "
              isMulti
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
              id={zSchemaName}
              aria-checked="true"
              {...register(zSchemaName, {
                onChange: onHandleChange,
              })}
            />
          </div>
        );
      }
      case 'file': {
        return (
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
      }
      case 'normal': {
        return (
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
                'focus:outline-1 focus:outline-blueTheme mt-1 w-full bg-inputBgGrey placeholder:text-inputPlaceholder border-borderMain border-1 rounded-md p-2 disabled:bg-inputDisabled disabled:text-slate-600'
              )}
              {...register(zSchemaName, {
                onChange: onHandleChange,
              })}
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
            {...register(zSchemaName, {
              onChange: onHandleChange,
            })}
          />
        );
      }
      default: {
        return (
          <input
            id={zSchemaName}
            type={inputType}
            placeholder={placeholder}
            className={clsx(
              'focus:outline-1 focus:outline-blueTheme mt-1 w-full bg-inputBgGrey placeholder:text-inputPlaceholder border-borderMain border-1 rounded-md p-2 disabled:bg-inputDisabled disabled:text-slate-600'
            )}
            {...register(zSchemaName)}
            disabled={disableInput}
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
          className={clsx(
            'focus:outline-1 focus:outline-blueThememt-1 w-full bg-inputBgGrey placeholder:text-inputPlaceholder border-borderMain border-1 rounded-md p-2 disabled:bg-inputDisabled disabled:text-slate-600'
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
    return helloworld();
  }

  // if (inputCompType === 'textArea') {
  //   inputComp = (
  //     <div>
  //       <label htmlFor={zSchemaName} className="pb-2">
  //         {inputLabel}
  //       </label>
  //       <div>
  //         <textarea
  //           id={zSchemaName}
  //           {...register(zSchemaName, {
  //             onChange: onHandleChange,
  //           })}
  //           className="focus:outline-1 focus:outline-blueTheme p-2 mt-2 h-full bg-inputBgGrey border-inputBorder border-1 rounded-md w-full -mb-2"
  //         />
  //       </div>
  //     </div>
  //   );
  // } else if (inputCompType === 'select') {
  //   inputComp = (
  //     <div>
  //       <label htmlFor={zSchemaName} className="pb-2">
  //         {inputLabel}
  //       </label>
  //       <CreatableSelect
  //         className="mt-2 w-full bg-inputBgGrey placeholder:text-placeholder border-inputBorder border-1 rounded-md "
  //         isMulti
  //         options={options}
  //       />
  //     </div>
  //   );
  // } else if (inputCompType === 'switch') {
  //   inputComp = (
  //     <div className="flex justify-between">
  //       <label
  //         className="inline-block pl-[0.15rem] hover:cursor-pointer"
  //         htmlFor={zSchemaName}
  //       >
  //         {inputLabel}
  //       </label>
  //       <input
  //         className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-blueTheme checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-blueTheme checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-blueTheme checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-blueTheme dark:checked:after:bg-blueTheme dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
  //         type={inputType}
  //         role="switch"
  //         id={zSchemaName}
  //         aria-checked="true"
  //         {...register(zSchemaName, {
  //           onChange: onHandleChange,
  //         })}
  //       />
  //     </div>
  //   );
  // } else if (inputCompType === 'file') {
  //   inputComp = (
  //     <div>
  //       {inputLabel && (
  //         <label htmlFor={zSchemaName} className="pb-2">
  //           {inputLabel}
  //         </label>
  //       )}

  //       <div className="h-42">
  //         <label
  //           htmlFor={zSchemaName}
  //           className={clsx(
  //             'truncate focus:outline-1 focus:outline-blueTheme mt-2 block w-full bg-inputBgGrey placeholder:text-inputPlaceholder border-borderMain border-1 rounded-md p-2 disabled:bg-inputDisabled disabled:text-gray-50'
  //           )}
  //         >
  //           {cardState.designForm[zSchemaName as keyof CardState['designForm']]
  //             ? cardState.designForm[
  //                 zSchemaName as keyof CardState['designForm']
  //               ]
  //             : placeholder}
  //         </label>
  //         <input
  //           id={zSchemaName}
  //           type={inputType}
  //           placeholder={placeholder}
  //           className="hidden"
  //           required
  //           {...register(zSchemaName, {
  //             onChange: onHandleChange,
  //           })}
  //           disabled={disableInput}
  //         />
  //       </div>
  //     </div>
  //   );
  // } else if (inputCompType === 'normal') {
  //   inputComp = (
  //     <div className={className}>
  //       {inputLabel && (
  //         <label htmlFor={zSchemaName} className="pb-2">
  //           {inputLabel}
  //         </label>
  //       )}
  //       <input
  //         id={zSchemaName}
  //         type={inputType}
  //         placeholder={placeholder}
  //         className={clsx(
  //           'focus:outline-1 focus:outline-blueTheme mt-1 w-full bg-inputBgGrey placeholder:text-inputPlaceholder border-borderMain border-1 rounded-md p-2 disabled:bg-inputDisabled disabled:text-slate-600'
  //         )}
  //         {...register(zSchemaName, {
  //           onChange: onHandleChange,
  //         })}
  //         disabled={disableInput}
  //       />
  //     </div>
  //   );
  // } else if (inputCompType === 'color') {
  //   inputComp = (
  //     <input
  //       id={zSchemaName}
  //       type={inputType}
  //       placeholder={placeholder}
  //       className="h-full w-full focus:outline-1 focus:outline-blueTheme"
  //       {...register(zSchemaName, {
  //         onChange: onHandleChange,
  //       })}
  //     />
  //   );
  // } else if (inputType === 'password') {
  //   inputComp = (
  //     <div className="relative">
  //       <input
  //         id={zSchemaName}
  //         type={showPassword ? 'text' : 'password'}
  //         placeholder={placeholder}
  //         className={clsx(
  //           'focus:outline-1 focus:outline-blueThememt-1 w-full bg-inputBgGrey placeholder:text-inputPlaceholder border-borderMain border-1 rounded-md p-2 disabled:bg-inputDisabled disabled:text-slate-600'
  //         )}
  //         {...register(zSchemaName)}
  //         disabled={disableInput}
  //       />
  //       <button
  //         className="absolute top-3 right-2"
  //         onClick={(e) => handleClick(e)}
  //       >
  //         {showPassword ? (
  //           <EyeSlash size="24" className="text-gray-500" />
  //         ) : (
  //           <Eye size="24" className="text-gray-500" />
  //         )}
  //       </button>
  //     </div>
  //   );
  // } else {
  //   // for login and register
  //   inputComp = (
  //     <input
  //       id={zSchemaName}
  //       type={inputType}
  //       placeholder={placeholder}
  //       className={clsx(
  //         'focus:outline-1 focus:outline-blueTheme mt-1 w-full bg-inputBgGrey placeholder:text-inputPlaceholder border-borderMain border-1 rounded-md p-2 disabled:bg-inputDisabled disabled:text-slate-600'
  //       )}
  //       {...register(zSchemaName)}
  //       disabled={disableInput}
  //     />
  //   );
  // }

  // return inputComp;
};

export default InputComp;
