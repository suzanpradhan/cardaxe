import { StaticImageData } from 'next/image';

const HomeVideoSection = ({ bgCover }: { bgCover?: StaticImageData }) => {
  const bgImageStyle = bgCover
    ? {
        backgroundImage: `url(${bgCover.src})`,
      }
    : {};

  return (
    <div
      className="relative bg-cover bg-center mb-20"
      style={bgCover && bgImageStyle}
    >
      <div className="container mx-auto">
        <div className="relative top-20 flex flex-col items-center text-center">
          <h2 className="text-zinc-900 text-xl md:text-2xl lg:text-4xl font-extrabold pb-16 max-w-xl">
            Watch How{' '}
            <span className="bg-gradient-to-r from-blue-700 via-[#3366e8] to-blue-400 bg-clip-text text-transparent">
              Cardaxe
            </span>{' '}
            Transforms Your{' '}
            <span className="bg-gradient-to-r from-blue-700 via-[#3366e8] to-blue-400 bg-clip-text text-transparent">
              Business
            </span>
          </h2>
          <iframe
            src="https://www.youtube-nocookie.com/embed/g7xkVEWrX8E?rel=0&controls=0&showinfo=0&modestbranding=1&autohide=1"
            className="w-full max-w-4xl aspect-video shadow-xl"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default HomeVideoSection;
