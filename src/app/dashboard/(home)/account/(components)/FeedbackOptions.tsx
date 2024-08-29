import { ArrowRight2, InfoCircle, Star1 } from 'iconsax-react';

const FeedbackOptions = () => {
  return (
    <div className="bg-white px-5 py-5">
      <h3 className="text-base font-semibold mb-4">Feedback</h3>
      <div className="flex flex-col items-stretch justify-start gap-3">
        <div className="flex items-center justify-between bg-slate-100 h-12 px-4 rounded-lg">
          <div className="flex items-center gap-4">
            <Star1 size="24" variant="Bulk" className="text-slate-600" />
            <span className="text-slate-600 text-sm font-normal">Rate Us</span>
          </div>
          <ArrowRight2 size="20" variant="TwoTone" className="text-grayfont" />
        </div>
        <div className="flex items-center justify-between bg-slate-100 h-12 px-4 rounded-lg">
          <div className="flex items-center gap-4">
            <InfoCircle size="24" variant="Bulk" className="text-slate-600" />
            <span className="text-slate-600 text-sm font-normal">
              Report a bug
            </span>
          </div>
          <ArrowRight2 size="20" variant="TwoTone" className="text-grayfont" />
        </div>
      </div>
    </div>
  );
};

export default FeedbackOptions;
