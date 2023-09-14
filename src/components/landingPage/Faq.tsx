import React from 'react';

interface Props {
  question: string;
}

const Faq = ({ question }: Props) => {
  return (
    <li className="py-3">
      <a className="text-black font-bold  cursor-pointer">
        {'>'} {question}
      </a>
    </li>
  );
};

export default Faq;
