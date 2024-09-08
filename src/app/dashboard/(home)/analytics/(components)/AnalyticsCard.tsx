import { cn } from '@/lib/utils';
import { ArrowDownRight, ArrowUpRight } from '@phosphor-icons/react';
import { More } from 'iconsax-react';

type AnalyticsCardProps = {
  icon: React.ReactNode;
  label: string;
  count: number;
  secoundaryCount: number;
  increase: number;
};

export default function AnalyticsCard({
  icon,
  label,
  count,
  secoundaryCount,
  increase,
}: AnalyticsCardProps) {
  return (
    <div className="flex flex-1 flex-col gap-2 rounded-md border-1 border-borderMain p-4">
      <div className="flex justify-between">
        {icon}
        <More size="24" className="text-grayfont" />
      </div>
      <p className="text-sm">{label}</p>
      <div className="mb-2 flex items-end gap-2">
        <span className="text-4xl font-bold">{count}</span>
        <span className="pb-1 text-sm text-grayfont">{secoundaryCount}</span>
      </div>
      <div className="flex items-center gap-1 text-sm">
        {increase > 0 ? (
          <ArrowUpRight size={24} className="text-green-600" />
        ) : (
          <ArrowDownRight size={24} className="text-red-600" />
        )}
        <span className={cn(increase > 0 ? 'text-green-600' : 'text-red-600')}>
          {`${Math.abs(increase)}%  `}{' '}
        </span>
        <span>from last week</span>
      </div>
    </div>
  );
}
