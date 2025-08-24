import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { genres } from "../data/genres";
import { GenericResponse } from "../interfaces/generic-response.interface";
import { Movie } from "../interfaces/movie.interface";
import { TvShow } from "../interfaces/tv-shows.interface";

@Injectable({
    providedIn: "root"

})
export class HomeService {

    private basePath = environment.apiBasePath;
    private genres = genres;

    constructor(
        private _http: HttpClient
    ) { }

    getTrendingMovies(): Observable<GenericResponse<Movie[]>> {
        const url = `${this.basePath}/3/trending/movie/day?language=tr-tr`
        return this._http.get<GenericResponse<Movie[]>>(url)
            .pipe(map(res => this.setGenresToMovies(res)));
    }

    getTrendingTvShows(): Observable<GenericResponse<TvShow[]>> {
        const url = `${this.basePath}/3/trending/tv/day?language=tr-tr`
        return this._http.get<GenericResponse<TvShow[]>>(url)
            .pipe(map(res => this.setGenresToTvShows(res)));
    }

    getPopularMovies(): Observable<GenericResponse<Movie[]>> {
        const url = `${this.basePath}/3/movie/popular?language=tr-tr&page=1`
        return this._http.get<GenericResponse<Movie[]>>(url)
            .pipe(map(res => this.setGenresToMovies(res)));
    }

    getPopularTvShows(): Observable<GenericResponse<TvShow[]>> {
        const url = `${this.basePath}/3/tv/popular?language=tr-tr&page=1`
        return this._http.get<GenericResponse<TvShow[]>>(url)
            .pipe(map(res => this.setGenresToTvShows(res)));
    }

    private setGenresToMovies(result: GenericResponse<Movie[]>) {
        const data: Movie[] = [];
        for (let row_data of result.results) {
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
            page: result.page,
            results: data,
            total_pages: result.total_pages,
            total_results: result.total_results
        };
    }

    private setGenresToTvShows(result: GenericResponse<TvShow[]>) {
        const data: TvShow[] = [];
        for (let row_data of result.results) {
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
            page: result.page,
            results: data,
            total_pages: result.total_pages,
            total_results: result.total_results
        };
    }
}

