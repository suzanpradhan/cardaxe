import CircleLoader from '@/core/ui/loaders/CircleLoader';
import clsx from 'clsx';

type ButtonFormProps = {
  label: string;
  theme?: 'blue' | 'white' | 'accent';
  // bluebackground?: boolean;
  disableInput?: boolean;
  isLoading?: boolean;
  handleClick?: () => void;
};

const ButtonForm = ({
  label,
  isLoading = false,
  disableInput,
  // bluebackground,
  theme = 'blue',
  handleClick,
}: ButtonFormProps) => {
  return (
    <button
      onClick={handleClick}
      role="link"
      type="submit"
      className={clsx(
        'w-full rounded-md disabled:bg-componentBgGrey active:shadow-xl h-10',
        theme === 'blue' && 'bg-blueTheme text-white',
        theme === 'white' &&
          'bg-transparent text-blueTheme border-1 border-blueTheme',
        theme === 'accent' && 'bg-input ring-gray-300 ring-1'
      )}
      disabled={disableInput}
    >
      {!isLoading ? label : <CircleLoader />}
    </button>
  );
};

export default ButtonForm;
