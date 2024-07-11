import CardWithImage from '@/components/landingPage/CardWithImage';
import { StaticImageData } from 'next/image';
import defaultImage from '../../../../public/square_image.jpg';

const HomeInfoSection = ({ bgCover }: { bgCover?: StaticImageData }) => {
  const bgImageStyle = bgCover
    ? {
        backgroundImage: `url(${bgCover.src})`,
      }
    : {};
  return (
    <div className="relative py-20" style={bgCover && bgImageStyle}>
      <div className="container mx-auto h-full">
        <div className="relative w-full h-auto">
          <CardWithImage
            headingText="Seize Every Chance to Expand Your Network"
            paragraphText="In today's interconnected world, networking is more crucial than ever. Building a strong network can open doors to new opportunities, foster collaborations, and accelerate your professional growth. By actively engaging with others, sharing knowledge, and expanding your connections, you can create a robust support system that contributes to your success. Don't let chances slip by—seize every moment to connect, learn, and grow your network for a brighter future."
            image={defaultImage}
            imageIsLeft={true}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeInfoSection;
