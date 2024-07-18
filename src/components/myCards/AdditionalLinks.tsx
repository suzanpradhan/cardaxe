import { StaticImageData } from 'next/image';
import HeadingTitles from '../HeadingTitles';
import LinkItem from './(common)/LinkItem';

interface LinkDataType {
  id: number;
  name: string;
  icon: StaticImageData;
  url: string;
}

type AdditionalLinkType = {
  linkData: LinkDataType[];
  title: string;
};

const AdditionalLinks = ({ linkData, title }: AdditionalLinkType) => {
  return (
    <div className="flex flex-col gap-4">
      <HeadingTitles label={title ? title : 'Extra Links'} />
      <div className="flex flex-col gap-2">
        {linkData && linkData.length > 0
          ? linkData.map((item, index) => <LinkItem item={item} key={index} />)
          : null}
      </div>
    </div>
  );
};

export default AdditionalLinks;
