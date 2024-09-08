import { cn } from '@/lib/utils';

interface Props {
  headingTitle: string;
  contentName?: string;
  center?: Boolean;
}

const ContentHeading = ({ headingTitle, contentName, center }: Props) => {
  return (
    <h3
      className={cn(
        'text-2xl font-extrabold lg:text-4xl',
        contentName === 'video title' && 'max-w-2xl',
        center === true && 'text-center'
      )}
    >
      {headingTitle}
    </h3>
  );
};

export default ContentHeading;
