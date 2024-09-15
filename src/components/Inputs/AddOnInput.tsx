import { cn } from '@/lib/utils';
import { ChangeEventHandler } from 'react';
import InputLable from './InputLabel';
import { TextFieldProps } from './TextInput';

export default function AddOnInput({
  className,
  error,
  prefix,
  ...props
}: TextFieldProps) {
  return (
    <div className={`${className}`}>
      {props.label && props.id && (
        <InputLable htmlFor={props.id} inputLabel={props.label} />
      )}

      <div
        className={cn(
          'flex w-full overflow-hidden rounded-md border-1 bg-inputBgGrey placeholder:text-inputPlaceholder disabled:bg-inputDisabled disabled:text-slate-600 has-[:focus]:ring-1 has-[:focus]:ring-blueTheme',
          error ? 'border-redError' : 'border-borderMain'
        )}
      >
        <span className="flex items-center bg-white px-2">{prefix}</span>
        <input
          onChange={props.onChange as ChangeEventHandler<HTMLInputElement>}
          {...props}
          className="bg-inputBgGrey p-2 focus:border-0 focus:outline-0"
        />
      </div>
    </div>
  );
}
