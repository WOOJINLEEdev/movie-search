import { useRef, FormEvent, ChangeEvent } from 'react';
import { atom, useRecoilState } from 'recoil';
import styled from 'styled-components';
import { instance } from 'utils/http-client';
import { BsSearch, BsFillBookmarkStarFill } from 'react-icons/bs';

export interface ISearch {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

export interface ISearchResults {
  totalResults: string;
  Search: ISearch[];
  Response: string;
  Error?: string;
}

export const resultsState = atom<ISearchResults>({
  key: '#resultsState',
  default: { Search: [], Response: '', totalResults: '' },
});

export const searchState = atom({
  key: '#searchState',
  default: '',
});

export const pageNumberState = atom({
  key: '#pageNumberState',
  default: 1,
});

const SearchForm = () => {
  console.log('env', process.env.REACT_APP_TEST);
  const searchRef = useRef<HTMLInputElement>(null);

  const [search, setSearch] = useRecoilState(searchState);
  const [pageNumber, setPageNumber] = useRecoilState(pageNumberState);
  const [results, setResults] = useRecoilState<ISearchResults>(resultsState);

  function getSearchResultsApi() {
    return instance.get(`?apikey=${process.env.REACT_APP_MOVIE_API_KEY}&s=${search}&page=${pageNumber}`);
  }

  const loadSearchResults = async () => {
    try {
      const res = await getSearchResultsApi();
      setResults(res.data);
    } catch (err) {
      console.log(err);
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
    <FormContainer className='search_form' onSubmit={handleFormSubmit}>
      <label htmlFor='searchInput' className='visually_hidden'>
        검색
      </label>
      <input
        type='text'
        id='searchInput'
        className='search_input'
        placeholder='Search...'
        value={search}
        ref={searchRef}
        onChange={handleSearchChange}
      />
      <button type='submit' className='submit_btn' aria-label='Submit'>
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

  .search_input {
    width: 100%;
    height: 30px;
    border: 3px solid #efefef;
    border-radius: 5px;
    max-width: calc(100% - 123px);
    padding: 10px 97px 10px 20px;
    font-size: 20px;
    background: ${(props) => props.theme.colors?.bgColor};
    color: ${(props) => props.theme.colors?.titleColor};
  }

  .submit_btn {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 20px;
    right: 20px;
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
