import QrCodeGenerate from '@/core/ui/components/QrCodeGenerate';
import { Edit, Link21, More, Share, Sms } from 'iconsax-react';
import Image from 'next/image';
import Instagram from '../../public/instagram_image.png';
import Linkedin from '../../public/linkedin_image.png';

const QrModal = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center gap-4">
          <div className="flex w-full max-w-[15rem] flex-col items-center gap-3 rounded-xl bg-white p-4 shadow-md shadow-zinc-700/10">
            <div className="share-qr relative aspect-square w-full">
              {/* <Image src={QR.src} alt="qr-code" fill objectFit="contain" /> */}
              <QrCodeGenerate link={`https://google.com`} />
            </div>
            <span className="text-sm font-semibold text-zinc-900">
              @_eugene_cheng
            </span>
          </div>
          <div className="relative flex w-full max-w-[15rem] items-center justify-evenly gap-2 overflow-hidden rounded-xl py-2 shadow-md shadow-zinc-500/10 before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:bg-white/80 before:backdrop-blur-sm">
            <div className="flex flex-1 grow flex-col items-center gap-2">
              <div className="mx-auto flex aspect-square w-4/6 items-center justify-center rounded-full bg-white text-zinc-900 shadow-md shadow-zinc-500/10">
                <Edit variant="Bulk" />
              </div>
              <span className="text-center text-xs font-medium text-zinc-500">
                Edit
              </span>
            </div>
            <div className="flex flex-1 grow flex-col items-center gap-2">
              <div className="mx-auto flex aspect-square w-4/6 items-center justify-center rounded-full bg-white text-zinc-900 shadow-md shadow-zinc-500/10">
                <Share variant="Bulk" />
              </div>
              <span className="text-center text-xs font-medium text-zinc-500">
                Share
              </span>
            </div>
            <div className="flex flex-1 grow flex-col items-center gap-2">
              <div className="mx-auto flex aspect-square w-4/6 items-center justify-center rounded-full bg-white text-zinc-900 shadow-md shadow-zinc-500/10">
                <Link21 variant="Bulk" />
              </div>
              <span className="text-center text-xs font-medium text-zinc-500">
                Link
              </span>
            </div>
          </div>
        </div>
        <div className="relative flex flex-col overflow-hidden rounded-xl bg-white/20 shadow-md shadow-zinc-500/10 before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:bg-white/80 before:backdrop-blur-sm">
          <div className="flex h-auto items-center gap-4 border-b border-white/80 px-4 py-4 last-of-type:border-0">
            <div className="flex aspect-square h-8 items-center justify-center rounded-md bg-white text-2xl text-zinc-900 shadow-md shadow-zinc-500/10">
              <Sms variant="Bulk" />
            </div>
            <p className="text-base font-normal text-zinc-500">
              Share via Email
            </p>
          </div>
          <div className="flex h-auto items-center gap-4 border-b border-white/80 px-4 py-4 last-of-type:border-0">
            <div className="flex aspect-square h-8 items-center justify-center overflow-hidden rounded-md text-2xl text-zinc-900 shadow-md shadow-zinc-500/10">
              <div className="relative aspect-square w-full bg-white">
                <Image
                  src={Instagram.src}
                  alt="instagram-code"
                  fill
                  objectFit="contain"
                />
              </div>
            </div>
            <p className="text-base font-normal text-zinc-500">
              Share via Instagram
            </p>
          </div>
          <div className="flex h-auto items-center gap-4 border-b border-white/80 px-4 py-4 last-of-type:border-0">
            <div className="flex aspect-square h-8 items-center justify-center overflow-hidden rounded-md text-2xl text-zinc-900 shadow-md shadow-zinc-500/10">
              <div className="relative aspect-square w-full bg-white">
                <Image
                  src={Linkedin.src}
                  alt="linkedin-code"
                  fill
                  objectFit="contain"
                />
              </div>
            </div>
            <p className="text-base font-normal text-zinc-500">
              Share via Linkedin
            </p>
          </div>
          <div className="flex h-auto items-center gap-4 border-b border-white/80 px-4 py-4 last-of-type:border-0">
            <div className="flex aspect-square h-8 items-center justify-center rounded-md bg-white text-2xl text-zinc-900 shadow-md shadow-zinc-500/10">
              <More variant="Linear" />
            </div>
            <p className="text-base font-normal text-zinc-500">
              Share another way
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrModal;
