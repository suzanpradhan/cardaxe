import ProfileAside from '../(components)/ProfileAside';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex max-lg:flex-col">
      <div className="hidden px-2 md:border-r lg:block lg:basis-72">
        <ProfileAside />
      </div>
      <div className="mx-auto lg:grow">{children}</div>
    </div>
  );
}
