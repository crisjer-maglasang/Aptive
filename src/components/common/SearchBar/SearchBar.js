import { SearchIcon } from '@heroicons/react/outline';
import PropTypes from 'prop-types';
import { memo, useEffect, useState } from 'react';
import { CustomErrorMessage } from '@/components/common/Form';
import { removeTrailingSpaces } from '@/lib/utils/strings';
import { MIN_2_CHARS, validateStringLength } from '@/lib/validations';
import { addFsExcludeClass, mergeClassName } from '@/lib/utils';
import { Select } from '@/components/common';
import classNames from 'classnames';

const SearchBar = ({
  label,
  placeholder,
  searchText,
  searchType,
  inputName,
  selectName,
  typeOptions,
  disabled,
  className,
  onSearchClick,
  isSearchTypeSupported,
  onSearchValueChange,
  labelClassName,
  inputClassName,
  iconClassName,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectValue, setSelectValue] = useState('');

  const [isValid, setIsValid] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setSearchValue(searchText);
    setSelectValue(searchType);
  }, [searchText, searchType]);

  useEffect(() => {
    const isValid = validateStringLength(searchValue, 2, 'min');

    setIsValid(isValid);

    if (isSubmitted && isValid) {
      const defaultSearchValue = searchText;
      const defaultSearchType = searchType;
      const removedSpacesValue = removeTrailingSpaces(searchValue);
      if ((removedSpacesValue !== defaultSearchValue) || (selectValue !== defaultSearchType)) {
        onSearchClick({ searchText: removedSpacesValue, searchType: selectValue });
      }
    }
  }, [isSubmitted]);

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);

    if(onSearchValueChange) {
      onSearchValueChange(event.target.value);
    }

    if (isSubmitted) {
      setIsSubmitted(false);
    }
    if (!isValid) {
      setIsValid(true);
    }
  };

  const onSelectValue = (event) => {
    setSelectValue(event.target.value);

    if (isSubmitted) {
      setIsSubmitted(false);
    }
  };

  const onSubmitSearch = (event) => {
    event.preventDefault();

    setIsSubmitted(true);
  };

  return (
    <form
      onSubmit={onSubmitSearch}
      className={mergeClassName('relative', className)}
    >
      {label && <label htmlFor="search" className={classNames(labelClassName ?? 'block mb-2 text-sm text-gray-900')}>{label}</label>}
      <div className="flex">
        <input
          id="search"
          type="text"
          name={inputName}
          value={searchValue}
          onChange={onChangeSearchValue}
          placeholder={placeholder}
          disabled={disabled}
          className={classNames(inputClassName ?? addFsExcludeClass(
            'w-52 lg:w-64 p-2.5 text-sm text-gray-500 bg-white grow border border-gray-200 border-r-transparent rounded-l-md focus:z-10 focus:border-aptivegreen focus:border-r-aptivegreen' +
            'focus:outline-none focus:ring-1 focus:ring-aptivegreen',
            )
          )}
        />
        {isSearchTypeSupported && (
          <Select
            name={selectName}
            value={selectValue}
            options={typeOptions}
            onChange={onSelectValue}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                borderRadius: 'unset',
                width: '200px',
                height: '100%',
                borderColor: '#E5E7EB',
                ':hover': {
                  borderColor: '#E5E7EB',
                },
              }),
            }}
          />
        )}
        <button
          type="submit"
          className={mergeClassName(
            'flex items-center justify-center border border-l-0 border-gray-300 rounded-md rounded-l-none shadow-sm px-2 bg-white border-l-0',
            { 'border-l-0': isSearchTypeSupported },
            iconClassName,
          )}
        >
          <SearchIcon className="h-5 w-5 text-primary-300" />
        </button>
      </div>
      {!isValid
        ? <CustomErrorMessage text={MIN_2_CHARS} className="absolute left-0 -bottom-6" />
        : null}
    </form>
  );
};

SearchBar.defaultProps = {
  disabled: false,
  placeholder: 'Search',
};

SearchBar.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  searchText: PropTypes.string,
  searchType: PropTypes.string,
  typeOptions: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })),
  inputName: PropTypes.string,
  selectName: PropTypes.string,
  onSearchClick: PropTypes.func,
  isSearchTypeSupported: PropTypes.bool,
  onSearchValueChange: PropTypes.func,
};

export default memo(SearchBar);
