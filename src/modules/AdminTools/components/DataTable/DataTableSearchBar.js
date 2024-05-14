import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { SearchBar } from '@/components/common';
import { formatNumber } from '@/lib/utils';

const search = (name, searchText) =>
  `${name}`.toLowerCase().includes(searchText.toLowerCase());

const useDataTableSearchBar = ({ data, getSearchField, searchPlaceholder }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchText = useMemo(() => searchParams.get('q') ?? '', [searchParams]);

  const setSearchText = (search) => {
    searchParams.set('q', search);
    setSearchParams(searchParams);
  };

  const onSearchClick = ({ searchText }) => setSearchText(searchText);

  const searchedData = useMemo(() => {
    if (searchText !== '') {
      return data.filter((obj) => {
        const name = getSearchField(obj);

        if (!name) {
          return false;
        }

        if (typeof name === 'number') {
          if (formatNumber(name).includes(searchText)) {
            return true;
          }
        }

        if (Array.isArray(name)) {
          return name.some((checking) => search(checking, searchText));
        }

        return search(name, searchText);
      });
    }

    return data;
  }, [searchText, data, getSearchField]);

  return {
    searchedData,
    SearchBar: (
      <SearchBar
        inputName="search"
        searchText={searchText}
        onSearchClick={onSearchClick}
        placeholder={searchPlaceholder}
        shouldValidate={false}
        onSearchValueChange={setSearchText}
      />
    ),
  };
};

export default useDataTableSearchBar;
