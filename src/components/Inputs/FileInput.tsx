import clsx from 'clsx';
import { ChangeEventHandler } from 'react';
import InputLable from './InputLabel';

export interface FileInputProps {
  label?: string;
  placeholder?: string;
  id: string;
  value?: string;
  name?: string;
  className?: string;
  required?: boolean;
  error?: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
}

const FileInput = ({ required = true, ...props }: FileInputProps) => {
  return (
    <div className="w-full">
      {props.id && props.label && (
        <InputLable htmlFor={props.id} inputLabel={props.label} />
      )}

      <label
        htmlFor={props.id}
        className={clsx(
          'line-clamp-1 block !h-11 w-full truncate rounded-md border-1 bg-inputBgGrey p-2 text-inputPlaceholder placeholder:text-inputPlaceholder focus:outline-1 focus:outline-blueTheme disabled:bg-inputDisabled disabled:text-gray-50',
          props.error ? 'border-redError' : 'border-borderMain'
        )}
      >
        {props.value ?? props.placeholder}
      </label>
      <input
        onChange={(e) => props.onChange?.(e)}
        className="hidden"
        type="file"
        id={props.id}
        name={props.name}
      />
    </div>
  );
};

export default FileInput;
