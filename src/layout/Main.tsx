import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Loading from 'components/common/Loading';

const Home = lazy(() => import('pages/Home'));
const Bookmark = lazy(() => import('pages/Bookmark'));

const Main = () => {
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='bookmark' element={<Bookmark />} />
        </Routes>
      </Suspense>
    </main>
  );
};

export default Main;
