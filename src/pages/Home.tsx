import { useRecoilValue } from 'recoil';

import List from 'components/List';
import SearchForm, { resultsState } from 'components/SearchForm';

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
