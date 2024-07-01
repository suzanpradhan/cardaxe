import CircleLoader from '@/core/ui/loaders/CircleLoader';
import clsx from 'clsx';

type ButtonFormProps = {
  label: string;
  theme?: 'blue' | 'white' | 'accent';
  disableInput?: boolean;
  isLoading?: boolean;
  className?: string;
  handleClick?: () => void;
};

const ButtonForm = ({
  label,
  isLoading = false,
  disableInput,
  theme = 'blue',
  handleClick,
  className,
}: ButtonFormProps) => {
  return (
    <button
      onClick={handleClick}
      role="link"
      type="submit"
      className={clsx(
        'w-full rounded-sm disabled:bg-componentBgGrey active:shadow-xl h-10',
        theme === 'blue' && 'bg-blueTheme text-white',
        theme === 'white' &&
          'bg-transparent text-blueTheme border-1 border-blueTheme',
        theme === 'accent' && 'bg-input ring-gray-300 ring-1',
        className
      )}
      disabled={disableInput}
    >
      {!isLoading ? label : <CircleLoader />}
    </button>
  );
};

export default ButtonForm;
