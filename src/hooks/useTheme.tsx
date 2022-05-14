import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { dark, light } from 'styles/theme';

import { themeStatus } from 'state';

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
