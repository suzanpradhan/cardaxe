'use client';

import { cn } from '@/lib/utils';
import { Popover, PopoverTrigger } from '@radix-ui/react-popover';
import { SelectSingleEventHandler } from 'react-day-picker';
import { Calendar } from '../ui/calendar';
import { PopoverContent } from '../ui/popover';

type AdditionalDateSelectorProps = {
  label?: string;
  value?: Date;
  id: string;
  className?: string;
  placeholder?: string;
  onChange?: SelectSingleEventHandler;
};

export type DateSelectorProps = AdditionalDateSelectorProps;

const DateSelector = ({
  id,
  className,
  label,
  onChange,
  value,
  ...props
}: DateSelectorProps) => {
  return (
    <div className={`basis-1/2 last-of-type:mb-0 ` + className}>
      {/* {label ? (
        <label htmlFor={id} className="text-sm mb-2 text-dark-500">
          {label}
          {label ? '*' : ''}
        </label>
      ) : (
        <></>
      )} */}
      <Popover>
        <PopoverTrigger asChild className="w-full">
          <button className={cn('text-dark-500 flex h-full flex-col text-sm')}>
            {
              <span className="text-dark-500 mb-2 text-sm font-medium">
                Pick a date
              </span>
            }
            {/* <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /> */}
            <div className="flex min-h-[2.9rem] w-full flex-1 items-start rounded-md border bg-slate-50 px-4 py-3 text-sm focus:outline-none">
              {value ? (
                `${value.getDate()} / ${value.getMonth() + 1} / ${value.getFullYear()}`
              ) : (
                <span className="">{props.placeholder}</span>
              )}
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(day, selectedDay, activeModifiers, e) => {
              onChange?.(day, selectedDay, activeModifiers, e);
            }}
            className={'bg-white'}
            // disabled={(date) =>
            //   date > new Date() || date < new Date('1900-01-01')
            // }
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateSelector;
