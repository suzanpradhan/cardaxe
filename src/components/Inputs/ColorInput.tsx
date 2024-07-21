import { ChangeEventHandler } from 'react';

export interface ColorInputProps {
  label?: string;
  id: string;
  value?: string | number;
  name?: string;
  className?: string;
  required?: boolean;
  error?: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
}

const ColorInput = ({ ...props }: ColorInputProps) => {
  return (
    <input
      className="h-full w-full focus:outline-1 focus:outline-blueTheme"
      disabled={!props.required ?? true}
      onChange={props.onChange}
      type="color"
      {...props}
    />

    // <input
    //       className={clsx(
    //         'mt-1 w-full rounded-md border-1 bg-inputBgGrey p-2 placeholder:text-inputPlaceholder focus:outline-1 focus:outline-blueTheme disabled:bg-inputDisabled disabled:text-slate-600',
    //         error ? 'border-redError' : 'border-borderMain'
    //       )}
    //       disabled={!props.required}
    //       onChange={
    //         props.onChange as unknown as ChangeEventHandler<HTMLInputElement>
    //       }
    //       {...props}
    //     />
  );
};

export default ColorInput;
