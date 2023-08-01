import clsx from 'clsx';

interface Props {
  variant?: 'bg-green-600' | 'bg-yellow-500' | 'bg-red-600';
}

const Light = ({ variant = 'bg-green-600' }: Props) => {
  return <div className={clsx('rounded-full w-5 h-5', variant)}></div>;
};

export default Light;
