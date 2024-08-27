import ProfileAside from '../(components)/ProfileAside';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 px-2 md:col-span-4 md:border-r lg:col-span-2">
        <ProfileAside />
      </div>
      <div className="col-span-12 md:col-span-8 lg:col-span-10">{children}</div>
    </div>
  );
}
