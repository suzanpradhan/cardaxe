import Link from 'next/link';

interface Props {
  listItems: string[];
}

const List = ({ listItems }: Props) => {
  return (
    <ul className="text-white shrink-0 basis-40 flex flex-col gap-3">
      {listItems.map((listItem, index) => (
        <li key={index}>
          <Link href="/">{listItem}</Link>
        </li>
      ))}
    </ul>
  );
};

export default List;
