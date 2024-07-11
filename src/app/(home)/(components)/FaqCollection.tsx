'use client';

import { FAQS } from '@/constants/appConstants';
import { useState } from 'react';
import Faq from './Faq';

const FaqCollection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  return (
    <div className="container mx-auto py-16">
      <div className="w-full">
        <h3 className={`lg:text-4xl text-2xl font-extrabold text-center mb-10`}>
          Frequently Asked Questions
        </h3>
        <div className="flex flex-col">
          {Object.entries(FAQS).map(([key, { question, answer }], index) => (
            <Faq
              key={key}
              question={question}
              answer={answer}
              isActive={activeIndex === index}
              onToggle={() =>
                setActiveIndex((prevIndex) =>
                  prevIndex === index ? null : index
                )
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqCollection;
