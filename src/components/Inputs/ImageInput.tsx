import { cn } from '@/lib/utils';
import { ChangeEvent } from 'react';
import InputLable from './InputLabel';

export interface ImageInputProps {
  label?: string;
  id: string;
  name?: string;
  rows?: number;
  value?: File | null;
  className?: string;
  required?: boolean;
  error?: string;
  placeholder: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ImageInput = ({ className, ...props }: ImageInputProps) => {
  return (
    <div className={`flex flex-col last-of-type:mb-0 ` + className}>
      {props.label ? (
        <InputLable htmlFor={props.id} inputLabel={props.label} />
      ) : (
        <></>
      )}
      <div className="flex flex-col items-end rounded-md border-0 bg-transparent sm:flex-row sm:items-center sm:border sm:bg-slate-50">
        <label
          htmlFor={props.id}
          className={cn(
            'line-clamp-1 block !h-11 w-full truncate rounded-md border-1 bg-inputBgGrey p-2 text-inputPlaceholder placeholder:text-inputPlaceholder focus:outline-1 focus:outline-blueTheme disabled:bg-inputDisabled disabled:text-gray-50',
            props.error ? 'border-redError' : 'border-borderMain'
          )}
        >
          {props.value?.name ?? props.placeholder}
        </label>
        <input
          onChange={(e) => props.onChange?.(e)}
          className="hidden"
          type="file"
          id={props.id}
          name={props.name}
        />
      </div>
    </div>
  );
};

export default ImageInput;
