import CardWithImage from '@/components/landingPage/CardWithImage';
import Features from '@/components/landingPage/Features';
import { FEATURES_DATA } from '@/constants/appConstants';
import defaultImage from '../../../../public/square_image.jpg';

const HomeFeatureSection = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-x-5 gap-y-10">
          {FEATURES_DATA && FEATURES_DATA.length > 0
            ? FEATURES_DATA.map((data, index) => (
                <div className="col-span-12 md:col-span-4" key={index}>
                  <Features data={data} />
                </div>
              ))
            : null}
        </div>
        <div className="mt-10 md:mt-20">
          <CardWithImage
            headingText="Design Your Digital Card in a Flash"
            paragraphText="With CardAxe, crafting your personalized digital business card is lightning fast. Our sleek and intuitive tools empower you to design and customize a standout card in mere minutes, ready to impress and share instantly."
            image={defaultImage}
            imageIsLeft={false}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeFeatureSection;
