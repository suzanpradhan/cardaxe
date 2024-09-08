import { cn } from '@/lib/utils';
import { GroupBase, MultiValue, SingleValue } from 'react-select';
import { AsyncPaginate, LoadOptions } from 'react-select-async-paginate';
import { z } from 'zod';
import InputLable from './InputLabel';

interface SelectionOptions {
  label: string;
  value: string;
}

export const selectorDataSchema = z.object({
  value: z.string(),
  label: z.string(),
  extra: z.string().optional(),
  __isNew__: z.boolean().optional(),
});

export type SelectorDataType = z.infer<typeof selectorDataSchema>;

export interface SelectFieldProps {
  label?: string;
  placeholder?: string;
  id: string;
  name?: string;
  isMulti?: boolean;
  required?: boolean;
  className?: string;
  options?: SelectorDataType[];
  defaultValue?: SelectorDataType;
  isSearchable?: boolean;
  isClearable?: boolean;
  isCompact?: boolean;
  loadPaginatedOptions: LoadOptions<
    any,
    GroupBase<any>,
    {
      page: number;
    }
  >;
  error?: string;
  suffix?: React.ReactNode;
  value?: SingleValue<SelectorDataType> | MultiValue<SelectorDataType>;
  // type?: 'Creatable' | 'Select' | 'Async' | 'AsyncPaginate';
  loadOptions?: (inputValue: string) => void;
  handleChange?: (
    e:
      | SingleValue<{
          value: string;
          label: string;
          extra?: string | undefined;
          __isNew__?: boolean | undefined;
        }>
      | MultiValue<{
          value: string;
          label: string;
          extra?: string | undefined;
          __isNew__?: boolean | undefined;
        }>
  ) => void;
  formatOptionLabel?: (data: SelectorDataType) => React.ReactNode;
}

const SelectInput = ({
  className,
  suffix,
  error,
  ...props
}: SelectFieldProps) => {
  return (
    <div className={`${className}`}>
      {props.label && <InputLable htmlFor={''} inputLabel={props.label} />}

      {/* <input
        className={clsx(
          'mt-1 w-full rounded-md border-1 bg-inputBgGrey p-2 placeholder:text-inputPlaceholder focus:outline-1 focus:outline-blueTheme disabled:bg-inputDisabled disabled:text-slate-600',
          error ? 'border-redError' : 'border-borderMain'
        )}
        disabled={!props.required}
        onChange={props.onChange as ChangeEventHandler<HTMLInputElement>}
        {...props}
      /> */}
      <AsyncPaginate
        id="companyId"
        loadOptions={props.loadPaginatedOptions}
        value={props.value}
        getOptionValue={(option: any) => option.value}
        getOptionLabel={(option: any) => option.label}
        onChange={props.handleChange}
        className={cn(
          'placeholder:text-placeholder mt-1 w-full rounded-md border-1 bg-inputBgGrey',
          error ? 'border-redError' : 'border-borderMain'
        )}
        additional={{
          page: 1,
        }}
        isMulti={props.isMulti}
        isClearable={false}
        isSearchable={true}
        placeholder="Select an option"
        debounceTimeout={500}
        styles={{
          control: (base) => ({
            ...base,
            minHeight: props.isCompact ? 32 : 42,
            maxHeight: props.isCompact ? 32 : 42,
            border: 'none',
            outline: 'none',
            borderRadius: 6,
            backgroundColor: 'rgb(247 247 247)',
            flexWrap: 'wrap',
          }),
        }}
        theme={(theme) => {
          return {
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: '#F2F3F5',
              primary: '#2560AA',
            },
          };
        }}
      />
    </div>
  );
};
export default SelectInput;
