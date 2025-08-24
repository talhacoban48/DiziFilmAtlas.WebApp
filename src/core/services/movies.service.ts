import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { genres } from '../data/genres';
import { GenericResponse } from '../interfaces/generic-response.interface';
import { Movie } from '../interfaces/movie.interface';

@Injectable({
    providedIn: 'root'
})
export class MoviesService {

    private genres = genres;
    private basePath = environment.apiBasePath;

    constructor(
        private http: HttpClient,
    ) {

    }

    getTrendingMovies(): Observable<GenericResponse<Movie[]>> {
        const url = `${this.basePath}/trending/movie/day?language=tr-tr`
        return this.getMovies(url);
    };

    getUpcomingMovies(page: number): Observable<GenericResponse<Movie[]>> {
        const url = `${this.basePath}/movie/upcoming?language=tr-tr&page=${page}`
        return this.getMovies(url);
    };

    getPopularMovies(page: number): Observable<GenericResponse<Movie[]>> {
        const url = `${this.basePath}/movie/popular?language=tr-tr&page=${page}`
        return this.getMovies(url);
    };

    getTopRatedMovies(page: number): Observable<GenericResponse<Movie[]>> {
        const url = `${this.basePath}/movie/top_rated?language=tr-tr&page=${page}`
        return this.getMovies(url);
    };

    getNowPlayingMovies(page: number): Observable<GenericResponse<Movie[]>> {
        const url = `${this.basePath}/movie/now_playing?language=tr-tr&page=${page}`
        return this.getMovies(url);
    };

    getSimilarMovies(movieId: number, page: number): Observable<GenericResponse<Movie[]>> {
        const url = `${this.basePath}/movie/${String(movieId)}/similar?language=tr-tr&page=${page}`
        return this.getMovies(url);
    };

    private getMovies(url: string): Observable<GenericResponse<Movie[]>> {
        return this.http.get<GenericResponse<Movie[]>>(url)
            .pipe(
                map(response => {
                    const data: Movie[] = [];
                    for (let row_data of response.results) {
                        const movie = row_data;
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
