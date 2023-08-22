import List from './List';
const LIST1: string[] = ['About', 'Services', 'Pricing', 'Blog'];
const LIST2: string[] = [
  'Help and Support',
  'Terms and Conditions',
  'Privacy Policy',
  'Careers',
  'Security',
];

const Footer = () => {
  return (
    <div className="bg-zinc-900 text-sm pt-12  flex flex-col gap-8 divide-y-2">
      <div className="max-w-6xl px-8 mx-auto flex flex-col gap-4">
        <div className="flex justify-between gap-8 border-b-white">
          <div className="grow shrink flex flex-col gap-3">
            <h2 className="text-white font-extrabold text-2xl">cardaxe.</h2>
            <p className=" text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae sequi quos ea ex itaque labore sed sunt totam qui
              dolore, nemo rem, libero eum suscipit nesciunt quis recusandae.
              Deleniti, quasi!
            </p>
          </div>
          <List listItems={LIST1} />
          <List listItems={LIST2} />
        </div>
        <p className="text-white">
          Copyright @2023 CardAxe LLC. All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
