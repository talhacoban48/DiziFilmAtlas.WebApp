import { Routes } from '@angular/router';
import { CastDetails } from '../features/cast-details/cast-details';
import { Casts } from '../features/casts/casts';
import { Home } from '../features/home/home';
import { MovieDetails } from '../features/movie-details/movie-details';
import { Movies } from '../features/movies/movies';
import { TvshowDetails } from '../features/tvshow-details/tvshow-details';
import { Tvshows } from '../features/tvshows/tvshows';
import { NotFound } from '../shared/not-found/not-found';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'home', component: Home },
    {
        path: 'movies',
        children: [
            { path: '', component: Movies },
            { path: 'discover', component: Movies },
            { path: ':category/:page', component: Movies },
            { path: ':movieId', component: MovieDetails },
        ],
    },
    {
        path: 'tvshows',
        children: [
            { path: '', component: Tvshows },
            { path: 'discover', component: Tvshows },
            { path: ':category/:page', component: Tvshows },
            { path: ':tvShowId', component: TvshowDetails },
        ],
    },
    {
        path: 'casts',
        children: [
            { path: '', component: Casts },
            { path: ":category/:page", component: Casts },
            { path: ":castId", component: CastDetails }
        ],
    },
    { path: 'notfound', component: NotFound },
    { path: '**', component: NotFound },
];


