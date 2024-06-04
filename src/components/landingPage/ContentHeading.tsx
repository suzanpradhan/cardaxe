import clsx from 'clsx';
interface Props {
  headingTitle: string;
  contentName?: string;
  center?: Boolean;
}

const ContentHeading = ({ headingTitle, contentName, center }: Props) => {
  return (
    <h3
      className={clsx(
        'lg:text-4xl text-2xl font-extrabold ',
        contentName === 'video title' && 'max-w-2xl',
        center === true && 'text-center'
      )}
    >
      {headingTitle}
    </h3>
  );
};

export default ContentHeading;
