import Link from 'next/link';

export enum Alignment {
  horizontal,
  vertical,
}

type ShareLinkButtonProps = {
  shareLink: string;
  logo: React.ReactNode;
  label: string;
  alignment?: Alignment;
};

export default function ShareLinkButton({
  shareLink,
  logo,
  label,
  alignment = Alignment.vertical,
}: ShareLinkButtonProps) {
  if (alignment === Alignment.vertical) {
    return (
      <Link
        href={`${shareLink}`}
        className="flex flex-1 grow flex-col items-center gap-2"
      >
        <div className="relative mx-auto flex aspect-square w-4/6 items-center justify-center overflow-hidden rounded-full bg-white text-zinc-900 shadow-md shadow-zinc-500/10">
          {logo}
        </div>
        <span className="text-center text-xs font-medium text-zinc-500">
          {label}
        </span>
      </Link>
    );
  } else {
    return (
      <Link
        href={`${shareLink}`}
        className="flex h-auto items-center gap-4 border-b border-white/80 px-4 py-4 last-of-type:border-0"
      >
        <div className="relative flex aspect-square h-8 items-center justify-center rounded-md bg-white text-2xl text-zinc-900 shadow-md shadow-zinc-500/10">
          {logo}
        </div>
        <p className="text-base font-normal text-zinc-500">{label}</p>
      </Link>
    );
  }
}
