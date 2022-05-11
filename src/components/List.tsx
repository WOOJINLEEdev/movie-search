import { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import Item, { bookmarkState } from 'components/Item';
import { ISearch, ISearchResults, pageNumberState, resultsState, searchState } from 'components/SearchForm';
import { instance } from 'utils/http-client';

interface Props {
  searchResults: ISearchResults;
}

export interface IResult extends ISearch {
  bookmark: boolean;
}

const List = ({ searchResults }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [disabled, setDisabled] = useState<boolean>(false);

  const myBookmark = useRecoilValue(bookmarkState);
  const search = useRecoilValue(searchState);
  const [pageNumber, setPageNumber] = useRecoilState<number>(pageNumberState);
  const setResults = useSetRecoilState<ISearchResults>(resultsState);

  const addBookmarkInSearchResults = (searchResults?.Search ?? []).map((searchResult) => {
    return { ...searchResult, bookmark: myBookmark.findIndex((item) => item.imdbID === searchResult.imdbID) >= 0 };
  });

  const loadMore = async () => {
    if (!search) {
      return;
    }

    setLoading(true);
    try {
      const res = await getSearchResultsApi();
      const results: ISearchResults = res.data;

      if (results.Response === 'False') {
        throw new Error(results.Error);
      }

      setResults((prevResults) => ({ ...prevResults, Search: [...prevResults.Search, ...results.Search] }));
      setHasNextPage(results.Search.length === 10);
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    } catch (error) {
      setDisabled(true);
    } finally {
      setLoading(false);
    }
  };
  const [infiniteRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled,
    rootMargin: '0px 0px 10px 0px',
  });

  function getSearchResultsApi() {
    return instance.get(`?apikey=${process.env.REACT_APP_MOVIE_API_KEY}&s=${search}&page=${pageNumber}`);
  }

  return (
    <ListContainer>
      <div className='total_count'>
        검색 결과 총 {Number(searchResults.totalResults) > 0 ? searchResults.totalResults : 0}개
      </div>

      <ul>
        {searchResults.Search.length > 0 ? (
          addBookmarkInSearchResults.map((result: IResult) => {
            return <Item key={result.imdbID} result={result} />;
          })
        ) : (
          <li className='result_no_data'>검색 결과가 없습니다.</li>
        )}
        {hasNextPage && (
          <li style={{ marginTop: '110px', height: '80px', background: '#fff' }} ref={infiniteRef}>
            loading...
          </li>
        )}
      </ul>
    </ListContainer>
  );
};

export default List;

const ListContainer = styled.div`
  padding: 0 20px;

  .total_count {
    margin: 10px 0;
  }

  .result_no_data {
    padding: 20px;
    min-height: calc(100vh - 200px);
  }
`;
