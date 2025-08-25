import { Routes } from '@angular/router';
import { Casts } from '../features/casts/casts';
import { Home } from '../features/home/home';
import { Movies } from '../features/movies/movies';
import { Tvshows } from '../features/tvshows/tvshows';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'home', component: Home },
    {
        path: 'movies',
        children: [
            { path: '', component: Movies },
            { path: 'discover', component: Movies },
            { path: ':category/:page', component: Movies },
            { path: ':movieId', component: Movies },
        ],
    },
    {
        path: 'tvshows',
        children: [
            { path: '', component: Tvshows },
            { path: 'discover', component: Tvshows },
            { path: ':category/:page', component: Tvshows },
            { path: ':tvshowId', component: Tvshows },
        ],
    },
    {
        path: 'casts',
        children: [
            { path: '', component: Casts },
            { path: ":category/:page", component: Casts },
            { path: "cast/:castId", component: Casts }
        ],
    },
];


