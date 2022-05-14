import { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import Item from 'components/common/Item';
import { instance } from 'utils/http-client';
import { handleError, ISearch, ISearchResults } from 'utils/api';

import { pageNumberState, resultsState, searchState, bookmarkState, hasNextPageState } from 'state';

export interface IResult extends ISearch {
  bookmark: boolean;
}

interface IProps {
  searchResults: ISearchResults;
}

const List = ({ searchResults }: IProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const myBookmark = useRecoilValue(bookmarkState);
  const search = useRecoilValue(searchState);
  const [pageNumber, setPageNumber] = useRecoilState<number>(pageNumberState);
  const [hasNextPage, setHasNextPage] = useRecoilState<boolean>(hasNextPageState);
  const [results, setResults] = useRecoilState<ISearchResults>(resultsState);

  const addBookmarkInSearchResults = (searchResults?.Search ?? []).map((searchResult) => {
    return {
      ...searchResult,
      bookmark: myBookmark.findIndex((item) => item.imdbID === searchResult.imdbID) >= 0,
    };
  });

  const loadMore = async () => {
    if (!search) {
      return;
    }

    const lastPageNumber = Math.ceil(Number(results.totalResults) / 10);
    if (lastPageNumber <= 1) {
      setHasNextPage(false);
      return;
    }

    setLoading(true);
    try {
      const res = await getSearchResultsApi();
      const apiResults: ISearchResults = res.data;

      handleError(apiResults);
      setResults((prevResults) => ({
        ...prevResults,
        Search: [...prevResults.Search, ...(apiResults.Search || [])],
      }));
      setHasNextPage(pageNumber < lastPageNumber);
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
      <div className='totalCount'>
        검색 결과 총 {Number(searchResults.totalResults) > 0 ? searchResults.totalResults : 0}개
      </div>

      <ul>
        {searchResults.Search.length > 0 ? (
          addBookmarkInSearchResults.map((result: IResult) => {
            return <Item key={`search_${result.imdbID}`} result={result} />;
          })
        ) : (
          <li className='resultNoData'>검색 결과가 없습니다.</li>
        )}
        {pageNumber >= 2 && hasNextPage && <li className='skeleton_item' ref={infiniteRef} />}
      </ul>
    </ListContainer>
  );
};

export default List;

const ListContainer = styled.div`
  width: calc(100% - 40px);
  padding: 0 20px;

  .totalCount {
    margin: 10px 0 20px;
  }

  .resultNoData {
    min-height: calc(100vh - 262px);
    line-height: calc(100vh - 262px);
    text-align: center;
  }
`;
