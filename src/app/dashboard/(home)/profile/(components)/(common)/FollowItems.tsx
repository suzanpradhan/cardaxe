export default function FollowItems({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="col-span-4 row-span-1">
      <div className="flex flex-col items-center justify-stretch gap-1">
        <span className="font-bold text-base">{value}</span>
        <span className="font-normal text-xs text-grayfont">{label}</span>
      </div>
    </div>
  );
}
