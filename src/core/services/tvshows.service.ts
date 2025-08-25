import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { genres } from '../data/genres';
import { GenericResponse } from '../interfaces/generic-response.interface';
import { TvShow } from '../interfaces/tv-shows.interface';
import { TvShowDetails } from '../interfaces/tvshow-details.interface';

@Injectable({
    providedIn: 'root'
})
export class TvShowsService {

    private genres = genres;
    private basePath = environment.apiBasePath;
    private countryUrl = environment.restCountriesPath;

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

    getTvShowDetails(tvShowId: number): Observable<TvShowDetails> {
        const url = `${this.basePath}/tv/${tvShowId}?language=tr-tr`
        return this.http.get<TvShowDetails>(url).pipe(
            map(result => {
                for (let i in result.production_countries) {
                    let country_data = result.production_countries[i];
                    this.http.get(this.countryUrl + country_data.iso_3166_1).subscribe(country => {
                        let country_flag = (country as Array<any>)[0].flags.png;
                        if (country_flag) {
                            result.production_countries[i].flag_path = country_flag;
                        }
                    })
                }
                return result;
            })
        );
    }

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
