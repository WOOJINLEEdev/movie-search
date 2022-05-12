import { useRecoilValue } from 'recoil';

import SearchForm, { resultsState } from 'components/home/SearchForm';
import List from 'components/home/List';

const Home = () => {
  const searchResults = useRecoilValue(resultsState);

  return (
    <>
      <SearchForm />
      <List searchResults={searchResults} />
    </>
  );
};

export default Home;
