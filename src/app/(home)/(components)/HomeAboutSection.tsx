import CardWithImageSmall from '@/components/landingPage/CardWithImageSmall';
import { CardaxeFlowData } from '@/constants/appConstants';
import { Edit, Edit2, ElementPlus, UserEdit } from 'iconsax-react';

// Define icon components mapping
const iconComponents: Record<string, React.ComponentType<any>> = {
  UserEdit: UserEdit,
  Edit: Edit,
  Edit2: Edit2,
  ElementPlus: ElementPlus,
};

const HomeAboutSection = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto">
        <div className="flex flex-col gap-16">
          <h3
            className={`text-zinc-900 text-xl md:text-2xl lg:text-4xl font-extrabold capitalize text-center`}
          >
            How do {` `}
            <span className="bg-gradient-to-r from-blue-700 via-[#3366e8] to-blue-400 bg-clip-text text-transparent">
              {`cardaxe's`}
            </span>
            {` `}
            digital {` `}
            <span className="bg-gradient-to-r from-blue-700 via-[#3366e8] to-blue-400 bg-clip-text text-transparent">
              card
            </span>
            {` `}
            work
          </h3>
          <div className="flex flex-col items-center lg:flex-row lg:items-start gap-y-12 gap-x-4 justify-between">
            {CardaxeFlowData && CardaxeFlowData.length > 0
              ? CardaxeFlowData.map((data, index) => {
                  const IconComponent = iconComponents[data.icon];
                  return (
                    <CardWithImageSmall data={data} key={index}>
                      <div className="text-blueTheme">
                        <IconComponent size={32} />
                      </div>
                    </CardWithImageSmall>
                  );
                })
              : null}

            {/* <CardWithImageSmall
              headingText="Choose a Template"
              paragraphText="Select from our wide range of professionally designed templates."
              image={defaultImage}
            >
              {' '}
              <div className="text-blueTheme">
                <Edit size="32" />
              </div>
            </CardWithImageSmall>
            <CardWithImageSmall
              headingText="Customize"
              paragraphText="Add your contact information, upload your photo, and personalize your card that reflect your brand."
              image={defaultImage}
            >
              <div className="text-blueTheme">
                <Edit2 size="32" />
              </div>
            </CardWithImageSmall>
            <CardWithImageSmall
              headingText="Save & Share"
              paragraphText="Save your card and start sharing it with your professional network instantly."
              image={defaultImage}
            >
              <div className="text-blueTheme">
                <ElementPlus size="32" />
              </div>
            </CardWithImageSmall> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeAboutSection;
