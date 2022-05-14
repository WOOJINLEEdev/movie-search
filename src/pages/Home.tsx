import { useRecoilValue } from 'recoil';

import SearchForm from 'components/home/SearchForm';
import List from 'components/home/List';
import useScrollRestoration from 'hooks/useScrollRestoration';

import { resultsState } from 'state';

const Home = () => {
  const searchResults = useRecoilValue(resultsState);

  useScrollRestoration();

  return (
    <>
      <SearchForm />
      <List searchResults={searchResults} />
    </>
  );
};

export default Home;
