import { Routes } from '@angular/router';
import { CastDetails } from '../features/cast-details/cast-details';
import { Casts } from '../features/casts/casts';
import { CompanyDetails } from '../features/company-details/company-details';
import { DiscoverMovies } from '../features/discover-movies/discover-movies';
import { DiscoverTvshows } from '../features/discover-tvshows/discover-tvshows';
import { Home } from '../features/home/home';
import { MovieDetails } from '../features/movie-details/movie-details';
import { Movies } from '../features/movies/movies';
import { Search } from '../features/search/search';
import { SeasonDetails } from '../features/season-details/season-details';
import { TvshowDetails } from '../features/tvshow-details/tvshow-details';
import { Tvshows } from '../features/tvshows/tvshows';
import { NotFound } from '../shared/not-found/not-found';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'home',
        component: Home
    },
    {
        path: 'movies',
        children: [
            { path: '', component: Movies },
            { path: 'discover', component: DiscoverMovies },
            { path: ':category/:page', component: Movies },
            { path: ':movieId', component: MovieDetails },
        ],
    },
    {
        path: 'tvshows',
        children: [
            { path: '', component: Tvshows },
            { path: 'discover', component: DiscoverTvshows },
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
    {
        path: 'companies',
        children: [
            { path: ":companyId", component: CompanyDetails }
        ],
    },
    {
        path: 'seasons',
        children: [
            { path: ":seriesId/:seasonNumber", component: SeasonDetails }
        ],
    },
    {
        path: 'search',
        children: [
            { path: ':category', component: Search },
        ],
    },
    {
        path: 'notfound',
        component: NotFound
    },
    {
        path: '**',
        component: NotFound
    },
];


