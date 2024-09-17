import Image from 'next/image';
import profileImage from '../../../../../../public/profile/profile.png';

export default function page() {
  return (
    <div className="flex-1 overflow-scroll rounded-md bg-inputBgGrey/50">
      <ul className="flex h-full flex-col gap-4 py-4">
        {Array.from({ length: 5 }, (_, i) => (
          <li className="flex items-center gap-4" key={i}>
            <div className="relative aspect-square w-12 shrink-0 overflow-hidden rounded-full">
              <Image
                className="h-full w-full"
                src={profileImage}
                alt="image"
                fill
                sizes="(max-width: 768px) 100vw, 700px"
                objectFit="cover"
              />
            </div>
            <div>
              <p className="text-sm">
                <span className="font-bold">Alex Brooker</span> viewed your card
              </p>
              <p className="text-sm text-grayfont">5h ago</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
