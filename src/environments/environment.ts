import { IEnvironment, Stage } from './types';

export const environment: IEnvironment = {
    production: false,
    environmentName: Stage.Development,
    apiBasePath: 'https://api.themoviedb.org/3',
    apiKey: "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTM0NGUxZmFiNDM2OGY4MmI1MjVkMjNlNDgzYTUwZiIsIm5iZiI6MTcxOTY4NDI4Ni42MTg2MTQsInN1YiI6IjY1Y2Y5N2M5NjBjNzUxMDE3YjY5ZDM1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.760HsQJfRRmMOtx9-pASInGBI8JhrLtbpJutcvVi3BQ",
    cdnUrl: "https://image.tmdb.org/t/p/w500",

};
