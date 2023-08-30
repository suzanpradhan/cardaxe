import { FormEventHandler } from 'react';
import TitleText from '../TitleText';

interface FormCardProps {
  children: React.ReactNode;
  onSubmit?: FormEventHandler<HTMLFormElement> | undefined;
  className?: string;
  titleText?: Boolean;
  description?: String;
}

const FormWrapper = ({
  children,
  onSubmit,
  className,
  titleText,
  description,
}: FormCardProps) => {
  return (
    <div
      className={
        `border rounded-xl flex flex-col max-w-8xl p-4 bg-slate-950` + className
      }
    >
      {titleText && <TitleText />}
      {description && <p className="pb-3">{description}</p>}

      {children}
    </div>
  );
};

export default FormWrapper;
