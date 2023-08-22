import Faq from './Faq';

const FaqCollection = () => {
  const QUESTIONS: string[] = [
    'What is CardAxe?',
    'Can I use CardAxe on my mobile Phone?',
    'What are the perks of Pro plan?',
    'Can I change my plan later?',
    'Can I keep updating my card myself?',
  ];
  return (
    <ul className="flex flex-col divide-y-2">
      {QUESTIONS.map((question, index) => (
        <Faq key={index} question={question} />
      ))}
    </ul>
  );
};

export default FaqCollection;
