import { IEnvironment, Stage } from './types';

export const environment: IEnvironment = {
    production: false,
    environmentName: Stage.Local,
    basePath: "http://localhost:4201",
    apiBasePath: 'https://api.themoviedb.org/3',
    apiKey: "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTM0NGUxZmFiNDM2OGY4MmI1MjVkMjNlNDgzYTUwZiIsIm5iZiI6MTcxOTY4NDI4Ni42MTg2MTQsInN1YiI6IjY1Y2Y5N2M5NjBjNzUxMDE3YjY5ZDM1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.760HsQJfRRmMOtx9-pASInGBI8JhrLtbpJutcvVi3BQ",
    cdnUrl: "https://image.tmdb.org/t/p",
    restCountriesPath: "https://restcountries.com/v3.1/alpha/",
    firebaseConfig: {
        apiKey: "AIzaSyA8Yu8z-boyUCwQXdXCPB5XqWzAkoySXxk",
        authDomain: "dizifilmatlas.firebaseapp.com",
        databaseURL: "https://dizifilmatlas-default-rtdb.firebaseio.com",
        projectId: "dizifilmatlas",
        storageBucket: "dizifilmatlas.firebasestorage.app",
        messagingSenderId: "814342677142",
        appId: "1:814342677142:web:fbf57ab8360b9b23f7d8b7",
        measurementId: "G-0JKHSSRBXM"
    },
};