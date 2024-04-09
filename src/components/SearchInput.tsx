import clsx from 'clsx';
import { Filter, SearchNormal1 } from 'iconsax-react';
import React from 'react';

type SearchInputPropsType = {
  greyBackground: boolean;
  requireFilter?: boolean;
};

const SearchInput = ({
  greyBackground,
  requireFilter,
}: SearchInputPropsType) => {
  return (
    <label
      htmlFor="input"
      className={clsx(
        'flex rounded-md justify-between items-center   text-grayfont border-1 border-borderMain ',
        greyBackground
          ? 'bg-inputBgGrey focus-within:bg-blueBg'
          : 'focus-within:border-blueTheme focus-within:text-blueTheme'
      )}
    >
      <SearchNormal1 size="36" className="px-2 shrink-0" variant="Bulk" />
      <input
        className="grow shrink h-full rounded-md focus:outline-0 bg-transparent"
        id="input"
        placeholder="Search"
      />
      {requireFilter && (
        <span className="text-grayfont flex items-center bg-componentBgGrey p-1 mr-1 rounded-md">
          <Filter size="20" variant="Bulk" />
          Filter
        </span>
      )}
    </label>
  );
};

export default SearchInput;

<label htmlFor="input" className="  ">
  <SearchNormal1 size="36" className="px-2 " variant="Bulk" />
  <input
    className="grow h-full rounded-md focus:outline-0 "
    id="input"
    placeholder="Search"
  />
</label>;
