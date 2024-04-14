interface Props {
  headingText: string;
  paragraphText: string;
}

const HeadingWithText = ({ headingText, paragraphText }: Props) => {
  return (
    <div className="max-w-xl mt-44 flex flex-col gap-4 mb-4 md:items-start items-center text-center md:text-left">
      <h2 className="!lg:text-5xl text-3xl font-extrabold !text-black">
        {headingText}
      </h2>
      <p>{paragraphText}</p>
    </div>
  );
};

export default HeadingWithText;
