import Image from 'next/image';
import Logo from '../../../public/logo.png';

export default function CardLayout() {
  return (
    <div className="container-type flex aspect-businessCard w-full rounded-lg bg-slate-200 bg-cover bg-center bg-no-repeat p-3">
      <div className="flex h-auto w-full flex-col justify-between gap-5 md:gap-0 lg:gap-5">
        <div className="flex grow gap-2">
          <div className="flex shrink-0 basis-4/5 flex-col items-start">
            <h3 className="fluid-text-heading text font-bold">
              Niwesh Shrestha
            </h3>
            <p className="fluid-text-sub-heading font-medium text-green-500">
              Managing Director
            </p>
            <p className="fluid-text-sub-heading font-medium">Kurma Tech</p>
          </div>
          <div className="flex items-start justify-end">
            <div className="h-auto w-full">
              <Image
                src={Logo}
                alt="company-logo-alt"
                className="-z-10 h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
        <div className="fluid-text-paragraph flex flex-col items-start gap-1 font-medium text-black/75">
          <p className="text-start">+977 9847337829</p>
          <p className="text-start">niweshs@gmail.com</p>
          <p className="font-bold">www.niweshshrestha.com.np</p>
        </div>
      </div>
    </div>
  );
}
