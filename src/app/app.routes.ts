import { Routes } from '@angular/router';
import { Home } from '../features/home/home';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'home', component: Home },
    {
        path: 'movies',
        loadComponent: () =>
            import('../features/movies/movies').then(
                (m) => m.Movies,
            ),
    },
    {
        path: 'tv-shows',
        loadComponent: () =>
            import('../features/tvshows/tvshows').then(
                (m) => m.Tvshows,
            ),
    },
    {
        path: 'casts',
        loadComponent: () =>
            import('../features/casts/casts').then(
                (m) => m.Casts,
            ),
    },
];
