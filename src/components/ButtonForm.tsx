import CircleLoader from '@/core/ui/loaders/CircleLoader';

type ButtonFormProps = {
  label: string;
  theme?: 'blue' | 'white' | 'accent' | 'error';
  type?: 'button' | 'submit' | 'reset';
  disableInput?: boolean;
  isLoading?: boolean;
  className?: string;
  handleClick?: () => void;
};

const ButtonForm = ({
  label,
  isLoading = false,
  type,
  disableInput,
  theme = 'blue',
  handleClick,
  className,
}: ButtonFormProps) => {
  return (
    <button
      onClick={handleClick}
      role="link"
      type={type ?? 'submit'}
      className={`flex h-10 w-full items-center justify-center rounded-sm px-4 active:shadow-xl disabled:bg-zinc-100 disabled:text-zinc-300 ${theme === 'blue' && 'bg-blueTheme text-white'} ${
        theme === 'white' &&
        'border-1 border-blueTheme bg-transparent text-blueTheme'
      } ${theme === 'accent' && 'bg-input ring-1 ring-zinc-300'} ${theme === 'error' && 'bg-red-500 text-white'} ${className}`}
      disabled={disableInput}
    >
      {!isLoading ? label : <CircleLoader />}
    </button>
  );
};

export default ButtonForm;
