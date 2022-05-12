export interface ISearch {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

export interface ISearchResults {
  totalResults: string;
  Search: ISearch[];
  Response: string;
  Error?: string;
}

export const ERROR_MOVIE_NOT_FOUND = 'Movie not found!';
export const ERROR_TOO_MANY_RESULTS = 'Too many results.';

export function handleError(apiResults: ISearchResults) {
  if (apiResults.Response === 'True') {
    return;
  }

  throw new Error(apiResults.Error);
}
