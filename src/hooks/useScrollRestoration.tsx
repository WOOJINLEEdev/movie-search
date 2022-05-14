import { useLayoutEffect, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { scrollYState } from 'state';

let tempScrollY = 0;

const useScrollRestoration = () => {
  const [scrollY, setScrollY] = useRecoilState<number>(scrollYState);

  const handleScroll = () => {
    tempScrollY = window.scrollY;
  };

  useLayoutEffect(() => {
    if (scrollY) {
      window.scrollTo(0, scrollY);
    }

    return () => {
      setScrollY(tempScrollY);
    };
  }, [scrollY, setScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setScrollY]);
};

export default useScrollRestoration;
