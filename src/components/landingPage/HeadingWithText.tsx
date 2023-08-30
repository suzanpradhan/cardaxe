interface Props {
  headingText: string;
  paragraphText: string;
}

const HeadingWithText = ({ headingText, paragraphText }: Props) => {
  return (
    <div className="max-w-xl mt-44 flex flex-col gap-4 mb-4">
      <h2 className="text-5xl font-extrabold text-black">{headingText}</h2>
      <p className="text-base">{paragraphText}</p>
    </div>
  );
};

export default HeadingWithText;
