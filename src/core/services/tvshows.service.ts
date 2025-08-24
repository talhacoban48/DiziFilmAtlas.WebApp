import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { genres } from '../data/genres';
import { GenericResponse } from '../interfaces/generic-response.interface';
import { TvShow } from '../interfaces/tv-shows.interface';

@Injectable({
    providedIn: 'root'
})
export class TvShowsService {

    private genres = genres;
    private basePath = environment.apiBasePath;

    constructor(
        private http: HttpClient,
    ) {

    }

    getTrendingTvShows(): Observable<GenericResponse<TvShow[]>> {
        const url = `${this.basePath}/trending/tv/day?language=tr-tr`
        return this.getTvShows(url);
    };

    getAiringTodayTvShows(page: number): Observable<GenericResponse<TvShow[]>> {
        const url = `${this.basePath}/tv/airing_today?language=tr-tr&page=${page}`
        return this.getTvShows(url);
    };

    getOnTheAirTvShows(page: number): Observable<GenericResponse<TvShow[]>> {
        const url = `${this.basePath}/tv/on_the_air?language=tr-tr&page=${page}`
        return this.getTvShows(url);
    };

    getPopularTvShows(page: number): Observable<GenericResponse<TvShow[]>> {
        const url = `${this.basePath}/tv/popular?language=tr-tr&page=${page}`
        return this.getTvShows(url);
    };

    getTopRatedTvShows(page: number): Observable<GenericResponse<TvShow[]>> {
        const url = `${this.basePath}/tv/top_rated?language=tr-tr&page=${page}`
        return this.getTvShows(url);
    };

    getSimilarTvShows(tvShowId: number, page: number): Observable<GenericResponse<TvShow[]>> {
        const url = `${this.basePath}/tv/${tvShowId}/similar?language=tr-tr&page=${page}`
        return this.getTvShows(url);
    };

    private getTvShows(url: string): Observable<GenericResponse<TvShow[]>> {
        return this.http.get<GenericResponse<TvShow[]>>(url)
            .pipe(
                map(response => {
                    const data: TvShow[] = [];
                    for (let row_data of response.results) {
                        const tvshow = row_data;
                        const genres: string[] = [];
                        if (row_data.backdrop_path) {
                            for (let genre of row_data.genre_ids) {
                                const genreName = this.genres.find(g => g.id == genre)?.name;
                                if (genreName) genres.push(genreName);
                            }
                            data.push({ ...row_data, genre_names: genres });
                        }
                    }
                    return {
                        page: response.page,
                        results: data,
                        total_pages: response.total_pages,
                        total_results: response.total_results
                    };
                })
            );
    };
}
