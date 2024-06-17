import CircleLoader from '@/core/ui/loaders/CircleLoader';
import clsx from 'clsx';

type ButtonFormProps = {
  label: string;
  bluebackground?: boolean;
  disableInput?: boolean;
  isLoading?: boolean;
  handleClick?: () => void;
};

const ButtonForm = ({
  label,
  isLoading = false,
  disableInput,
  bluebackground,
  handleClick,
}: ButtonFormProps) => {
  return (
    <button
      onClick={handleClick}
      role="link"
      type="submit"
      className={clsx(
        'w-full rounded-md disabled:bg-componentBgGrey active:shadow-xl h-12',
        bluebackground
          ? 'bg-blueTheme text-white'
          : 'bg-transparent text-blueTheme border-1 border-blueTheme'
      )}
      disabled={disableInput}
    >
      {!isLoading ? label : <CircleLoader />}
    </button>
  );
};

export default ButtonForm;
