import React, { Dispatch, SetStateAction, useState } from 'react';

interface Props {
  updateFilter: Dispatch<SetStateAction<string>>;
  selectOptions: string[];
  defaultFilter: string;
}

const Filter = ({ updateFilter, selectOptions, defaultFilter }: Props) => {
  const [selectedFilter, setSelectedFilter] = useState(defaultFilter);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value);
    updateFilter(event.target.value);
  };

  return (
    <>
      <select value={selectedFilter} onChange={handleSelect}>
        <option value=''>All</option>
        {selectOptions.map((value) => (
          <option key={value} value={value.toLowerCase()}>
            {value}
          </option>
        ))}
      </select>
    </>
  );
};

export default Filter;
