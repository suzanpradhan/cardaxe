import clsx from 'clsx';
import { Filter, SearchNormal1 } from 'iconsax-react';

type SearchInputPropsType = {
  greyBackground: boolean;
  requireFilter?: boolean;
  requireBorder?: boolean;
};

const SearchInput = ({
  greyBackground,
  requireFilter,
  requireBorder = true,
  ...props
}: SearchInputPropsType) => {
  return (
    <label
      htmlFor="input"
      className={clsx(
        'flex items-center justify-between rounded-md border-borderMain text-black',
        greyBackground
          ? 'bg-inputBgGrey focus-within:bg-blueBg'
          : 'focus-within:border-blueTheme focus-within:text-blueTheme',
        requireBorder ? 'border-1' : 'border-0'
      )}
    >
      <SearchNormal1 size="36" className="px-2 text-grayfont" variant="Bulk" />
      <input
        className="h-full grow rounded-md bg-transparent focus:outline-0"
        id="input"
        placeholder="Search"
        {...props}
      />
      {requireFilter && (
        <span className="mr-1 flex items-center rounded-md bg-componentBgGrey p-1 text-grayfont">
          <Filter size="20" variant="Bulk" />
          Filter
        </span>
      )}
    </label>
  );
};

export default SearchInput;
