import { ArrowRight2 } from 'iconsax-react';

interface Props {
  question: string;
  answer: string;
  isActive: boolean;
  onToggle: () => void;
}

const Faq = ({ question, answer, isActive, onToggle }: Props) => {
  // const [toggle, setToggle] = useState<boolean>(isActive);
  const inActiveClass = 'h-0';
  const activeClass = 'h-max py-5';
  const activeParentClass = 'border border-zinc-200 rounded-lg mt-5 mb-5';
  return (
    <div className={`flex flex-col px-5 ${isActive && activeParentClass}`}>
      <div
        className={`flex items-center justify-between gap-4 text-zinc-700 font-bold cursor-pointer py-5 border-b border-b-zinc-200`}
        onClick={onToggle}
      >
        <p className="w-max">{question}</p>
        <ArrowRight2 size="21" variant="TwoTone" />
      </div>
      <div
        className={`bg-white w-full overflow-hidden text-sm font-medium text-zinc-700 leading-6 ${isActive ? activeClass : inActiveClass}`}
      >
        {answer}
      </div>
    </div>
  );
};

export default Faq;
