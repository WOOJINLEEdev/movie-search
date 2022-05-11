import { useCallback, useEffect } from 'react';
import { useRecoilState, atom } from 'recoil';

import { dark, light } from 'styles/theme';

export const themeStatus = atom({
  key: 'themeStatus',
  default: light,
});

export const useTheme = () => {
  const [theme, setTheme] = useRecoilState(themeStatus);

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    setTheme(localTheme === 'light' ? light : dark);
  }, [setTheme]);

  const handleChangeTheme = useCallback(() => {
    const mode = theme === light ? 'dark' : 'light';
    window.localStorage.setItem('theme', mode);

    return setTheme(mode === 'light' ? light : dark);
  }, [setTheme, theme]);

  return { theme, handleChangeTheme };
};
