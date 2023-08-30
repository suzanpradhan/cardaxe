import clsx from 'clsx';
import React from 'react';
interface Props {
  headingTitle: string;
  contentName?: string;
  center?: Boolean;
}

const ContentHeading = ({ headingTitle, contentName, center }: Props) => {
  return (
    <h3
      className={clsx(
        'text-4xl font-extrabold col-span-3 ',
        contentName === 'video title' && 'w-140',
        center === true && 'text-center'
      )}
    >
      {headingTitle}
    </h3>
  );
};

export default ContentHeading;
