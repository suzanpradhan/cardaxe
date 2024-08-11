import Image from 'next/image';
import profileImage from '../../../../../../public/profile/profile.png';

export default function page() {
  return (
    <div className="mt-8 flex-1 overflow-scroll rounded-md bg-inputBgGrey/50">
      <ul className="flex h-full flex-col gap-4 p-4">
        {Array.from({ length: 20 }, (_, i) => (
          <li className="flex items-center gap-4" key={i}>
            <div className="relative h-16 w-16 rounded-full">
              <Image
                className="rounded-full"
                src={profileImage}
                alt="image"
                fill
                sizes="(max-width: 768px) 100vw, 700px"
                objectFit="contain"
              />
            </div>
            <div>
              <p>
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
