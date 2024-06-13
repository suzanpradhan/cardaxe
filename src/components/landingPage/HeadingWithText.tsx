interface Props {
  headingText: string;
  paragraphText: string;
  centerOnSmallerScreen?: boolean;
}

const HeadingWithText = ({
  headingText,
  paragraphText,
  centerOnSmallerScreen,
}: Props) => {
  return (
    <div
      className={`max-w-xl  flex flex-col gap-4 mb-4 items-start text-left ${
        centerOnSmallerScreen ? 'max-md:text-center' : ''
      }`}
    >
      <h2 className="!lg:text-5xl text-3xl font-extrabold !text-black">
        {headingText}
      </h2>
      <p>{paragraphText}</p>
    </div>
  );
};

export default HeadingWithText;
