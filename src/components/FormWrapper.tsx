import { FormEventHandler } from 'react';
import TitleText from './TitleText';

interface FormCardProps {
  children: React.ReactNode;
  onSubmit?: FormEventHandler<HTMLFormElement> | undefined;
  className?: string;
  titleText?: Boolean;
  description?: String;
}

const FormWrapper = ({
  children,
  className,
  titleText,
  description,
}: FormCardProps) => {
  return (
    <div className={`flex flex-col h-fit ` + className}>
      {titleText && <TitleText />}
      {description && (
        <p className="text-sm font-normal text-slate-600">{description}</p>
      )}
      {children}
    </div>
  );
};

export default FormWrapper;
