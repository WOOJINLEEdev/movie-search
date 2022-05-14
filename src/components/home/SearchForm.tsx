import { useRef, FormEvent, ChangeEvent } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { BsSearch } from 'react-icons/bs';

import { instance } from 'utils/http-client';
import { handleError, ISearchResults } from 'utils/api';

import { hasNextPageState, resultsState, searchState, pageNumberState, defaultResultsState } from 'state';

const SearchForm = () => {
  const searchRef = useRef<HTMLInputElement>(null);

  const [search, setSearch] = useRecoilState(searchState);
  const [pageNumber, setPageNumber] = useRecoilState(pageNumberState);
  const [results, setResults] = useRecoilState<ISearchResults>(resultsState);
  const setHasNextPageState = useSetRecoilState(hasNextPageState);

  function getSearchResultsApi() {
    return instance.get(`?apikey=${process.env.REACT_APP_MOVIE_API_KEY}&s=${search}&page=1`);
  }

  const loadSearchResults = async () => {
    try {
      const res = await getSearchResultsApi();
      handleError(res.data);
      setHasNextPageState(true);
      setResults(res.data);
      setPageNumber(2);
    } catch (err) {
      setResults(defaultResultsState);
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (search.trim().length > 0) {
      loadSearchResults();
    }
    searchRef.current?.focus();
  };

  return (
    <FormContainer onSubmit={handleFormSubmit}>
      <label htmlFor='searchInput' className='visually_hidden'>
        검색
      </label>
      <input
        type='text'
        id='searchInput'
        className='searchInput'
        placeholder='Search...'
        value={search}
        ref={searchRef}
        onChange={handleSearchChange}
      />
      <button type='submit' className='submitBtn' aria-label='Submit'>
        <BsSearch />
      </button>
    </FormContainer>
  );
};

export default SearchForm;

const FormContainer = styled.form`
  position: relative;
  width: calc(100% - 40px);
  padding: 20px;
  margin: 0 auto;

  .searchInput {
    width: 100%;
    max-width: calc(100% - 123px);
    height: 30px;
    padding: 10px 97px 10px 20px;
    font-size: 20px;
    color: ${(props) => props.theme.colors?.titleColor};
    background: ${(props) => props.theme.colors?.bgColor};
    border: 3px solid #efefef;
    border-radius: 5px;
  }

  .submitBtn {
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20%;
    max-width: 100px;
    height: 56px;
    padding: 10px;

    svg {
      width: 100%;
      max-width: 50px;
      height: 100%;
      max-height: 26px;
      color: #969696;
      text-align: right;
    }
  }
`;
