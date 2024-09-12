import ProfileAside from '../(components)/ProfileAside';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex max-lg:flex-col">
      <div className="px-2 md:border-r lg:basis-72">
        <ProfileAside />
      </div>
      <div className="mx-auto max-lg:w-96 lg:grow">{children}</div>
    </div>
  );
}
