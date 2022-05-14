import { atom } from 'recoil';
import store from 'store';

import { light } from 'styles/theme';
import { IResult } from 'components/home/List';
import { ISearchResults } from 'utils/api';

export const bookmarkState = atom<IResult[]>({
  key: '#bookmarkState',
  default: store.get('bookmark') || [],
});

export const hasNextPageState = atom<boolean>({
  key: '#hasNextPageState',
  default: true,
});

export const defaultResultsState = { Search: [], Response: '', totalResults: '' };
export const resultsState = atom<ISearchResults>({
  key: '#resultsState',
  default: defaultResultsState,
});

export const searchState = atom<string>({
  key: '#searchState',
  default: '',
});

export const pageNumberState = atom<number>({
  key: '#pageNumberState',
  default: 1,
});

export const scrollYState = atom<number>({
  key: '#scrollYState',
  default: 0,
});

export const themeStatus = atom({
  key: '#themeStatus',
  default: light,
});
