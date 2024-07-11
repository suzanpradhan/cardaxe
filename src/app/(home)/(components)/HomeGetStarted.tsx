import ButtonRounded from '@/components/ButtonRounded';

const HomeGetStarted = () => {
  return (
    <div className={`circularGradientBg py-20`}>
      <div className="container mx-auto flex flex-col items-center gap-5 text-center ">
        <h3
          className={`text-zinc-900  text-xl md:text-2xl lg:text-4xl font-extrabold capitalize`}
        >
          Unlock{' '}
          <span className="bg-gradient-to-r from-blue-700 via-[#3366e8] to-blue-400 bg-clip-text text-transparent">
            Digital Networking
          </span>{' '}
          with{' '}
          <span className="bg-gradient-to-r from-blue-700 via-[#3366e8] to-blue-400 bg-clip-text text-transparent">
            CardAxe
          </span>
        </h3>
        <p className="max-w-xl mx-auto text-sm md:text-lg font-medium text-zinc-700">
          Digitize your business card effortlessly with CardAxe. Customize,
          share instantly, and update on-the-fly. Join the future of networking
          today!
        </p>
        <ButtonRounded
          label="Get Started"
          href="/register"
          classNames="bg-gradient-to-r from-blue-700 via-[#3366e8] to-blue-400 text-white"
        />
      </div>
    </div>
  );
};

export default HomeGetStarted;
