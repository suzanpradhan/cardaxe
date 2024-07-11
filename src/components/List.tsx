import Link from 'next/link';

interface Props {
  listItems: string[];
}

const List = ({ listItems }: Props) => {
  return (
    <ul className="text-white/60 shrink-0 basis-1/2 flex flex-row md:flex-col gap-5 flex-wrap md:flex-nowrap">
      {listItems.map((listItem, index) => (
        <li key={index}>
          <Link href="/" className="hover:text-white underline md:no-underline">
            {listItem}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default List;
