import clsx from 'clsx';
import { ChangeEventHandler } from 'react';
import InputLable from './InputLabel';

export interface TextFieldProps {
  label?: string;
  placeholder?: string;
  id: string;
  value?: string | number;
  name?: string;
  type?: string;
  isMulti?: boolean;
  rows?: number;
  className?: string;
  required?: boolean;
  error?: string;
  suffix?: React.ReactNode;
  onChange?:
    | ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
}

const TextInput = ({ isMulti, className, error, ...props }: TextFieldProps) => {
  return (
    <div className={`${className}`}>
      {props.label && props.id && (
        <InputLable htmlFor={props.id} inputLabel={props.label} />
      )}
      {!isMulti ? (
        <input
          className={clsx(
            'mt-1 w-full rounded-md border-1 bg-inputBgGrey p-2 placeholder:text-inputPlaceholder focus:outline-1 focus:outline-blueTheme disabled:bg-inputDisabled disabled:text-slate-600',
            error ? 'border-redError' : 'border-borderMain'
          )}
          onChange={props.onChange as ChangeEventHandler<HTMLInputElement>}
          {...props}
        />
      ) : (
        <textarea
          className={clsx(
            'mt-1 w-full rounded-md border-1 bg-inputBgGrey p-2 placeholder:text-inputPlaceholder focus:outline-1 focus:outline-blueTheme disabled:bg-inputDisabled disabled:text-slate-600',
            error ? 'border-redError' : 'border-borderMain'
          )}
          cols={30}
          rows={props.rows}
          onChange={props.onChange as ChangeEventHandler<HTMLTextAreaElement>}
          {...props}
        />
      )}
    </div>
  );
};

export default TextInput;
