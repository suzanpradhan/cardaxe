import HeadingTitles from '../HeadingTitles';
import LinkItem from './(common)/LinkItem';

export interface LinkDataType {
  id?: number;
  icon?: string;
  name?: string;
}

const AdditionalLinks = ({
  linkData,
  title,
}: {
  linkData: LinkDataType[];
  title?: string;
}) => {
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
