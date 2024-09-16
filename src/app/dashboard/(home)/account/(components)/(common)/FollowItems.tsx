export default function FollowItems({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="col-span-4 row-span-1">
      <div className="flex flex-col items-center justify-stretch">
        <span className="text-base font-bold">{value}</span>
        <span className="text-xs font-normal text-grayfont">{label}</span>
      </div>
    </div>
  );
}
