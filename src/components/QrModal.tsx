import QrCodeGenerate from '@/core/ui/components/QrCodeGenerate';
import { Link21, More, Sms } from 'iconsax-react';
import Image from 'next/image';
import Linkedin from '../../public/linkedin_image.png';
import Facebook from '../../public/logo/facebook.png';
import WhatsApp from '../../public/logo/whatsapp.png';

import Link from 'next/link';
import { useState } from 'react';
import ShareLinkButton, { Alignment } from './ShareLinkButton';

const QrModal = ({
  slug,
  username,
  customUrl,
}: {
  slug: string;
  username: string;
  customUrl?: string;
}) => {
  // const { toast } = useToast();
  const [isCopied, setIsCopied] = useState<string | undefined>(undefined);
  const cardLink = customUrl
    ? `https://www.cardaxe.com/${customUrl}`
    : `https://www.cardaxe.com/${slug}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cardLink);
      setIsCopied('Link Successfully Copied');
      setTimeout(() => {
        setIsCopied(undefined);
      }, 2000);
      // toast({
      //   description: 'Link Successfully Copied',
      // });
      // Reset the copied state after 2 seconds
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };
  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center gap-4">
          {isCopied && (
            <div className="rounded-full bg-gray-50 px-5 py-2 shadow-slate-500 drop-shadow-sm">
              {isCopied}
            </div>
          )}

          <div className="flex w-full max-w-[15rem] flex-col items-center gap-3 rounded-xl bg-white p-4 shadow-md shadow-zinc-700/10">
            <div className="share-qr relative aspect-square w-full">
              <QrCodeGenerate link={cardLink} />
            </div>
            <span className="text-sm font-semibold text-zinc-900">
              {`@${username ?? 'eugene_cheng'}`}
            </span>
          </div>
          <div className="relative flex w-full max-w-[15rem] items-center justify-evenly gap-2 overflow-hidden rounded-xl py-2 shadow-md shadow-zinc-500/10 before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:bg-white/80 before:backdrop-blur-sm">
            <ShareLinkButton
              label="Email"
              logo={<Sms variant="Bulk" />}
              shareLink={`https://mail.google.com/mail/?view=cm&su=${encodeURIComponent('Cardaxe shared card')}&body=${encodeURIComponent(cardLink)}`}
            />
            <ShareLinkButton
              label="WhatsApp"
              logo={
                <Image
                  src={WhatsApp.src}
                  alt="instagram-code"
                  fill
                  objectFit="contain"
                />
              }
              shareLink={`https://wa.me/?text=${encodeURIComponent(cardLink)}`}
            />
            <button
              data-tooltip-target="tooltip-animation"
              type="button"
              className="flex flex-1 grow flex-col items-center gap-2"
              onClick={() => handleCopy()}
            >
              <div className="mx-auto flex aspect-square w-4/6 items-center justify-center rounded-full bg-white text-zinc-900 shadow-md shadow-zinc-500/10">
                <Link21 variant="Bulk" />
              </div>
              <span className="text-center text-xs font-medium text-zinc-500">
                Link
              </span>
            </button>
          </div>
        </div>
        <div className="relative flex min-w-96 flex-col overflow-hidden rounded-xl bg-white/20 shadow-md shadow-zinc-500/10 before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:bg-white/80 before:backdrop-blur-sm">
          <ShareLinkButton
            label="Share via Facebook"
            logo={
              <Image
                src={Facebook.src}
                alt="instagram-code"
                fill
                objectFit="contain"
              />
            }
            shareLink={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(cardLink)}`}
            alignment={Alignment.horizontal}
          />
          <ShareLinkButton
            label="Share via LinkedIn"
            logo={
              <Image
                src={Linkedin.src}
                alt="linkedin-code"
                fill
                objectFit="contain"
              />
            }
            shareLink={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(cardLink)}`}
            alignment={Alignment.horizontal}
          />
          <Link
            href={''}
            className="flex h-auto items-center gap-4 border-b border-white/80 px-4 py-4 last-of-type:border-0"
          >
            <div className="flex aspect-square h-8 items-center justify-center rounded-md bg-white text-2xl text-zinc-900 shadow-md shadow-zinc-500/10">
              <More variant="Linear" />
            </div>
            <p className="text-base font-normal text-zinc-500">
              Share another way
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QrModal;
