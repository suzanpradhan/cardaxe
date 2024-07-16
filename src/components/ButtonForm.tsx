import CircleLoader from '@/core/ui/loaders/CircleLoader';

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
      className={`h-10 w-full rounded-sm px-4 active:shadow-xl disabled:bg-zinc-100 disabled:text-zinc-300 ${theme === 'blue' && 'bg-blueTheme text-white'} ${
        theme === 'white' &&
        'border-1 border-blueTheme bg-transparent text-blueTheme'
      } ${theme === 'accent' && 'bg-input ring-1 ring-zinc-300'} ${className}`}
      disabled={disableInput}
    >
      {!isLoading ? label : <CircleLoader />}
    </button>
  );
};

export default ButtonForm;
