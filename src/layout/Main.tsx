import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('pages/Home'));
const Bookmark = lazy(() => import('pages/Bookmark'));

const Main = () => {
  return (
    <main>
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='bookmark' element={<Bookmark />} />
        </Routes>
      </Suspense>
    </main>
  );
};

export default Main;
