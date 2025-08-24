import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { GenericResponse } from "../interfaces/generic-response.interface";
import { Movie } from "../interfaces/movie.interface";
import { TvShow } from "../interfaces/tv-shows.interface";

@Injectable({
    providedIn: "root"

})
export class HomeService {

    private basePath = environment.apiBasePath;

    constructor(
        private _http: HttpClient
    ) { }

    getTrendingMovies(): Observable<GenericResponse<Movie[]>> {
        const url = `${this.basePath}/3/trending/movie/day?language=tr-tr`
        return this._http.get<GenericResponse<Movie[]>>(url);
    }

    getTrendingTvShows(): Observable<GenericResponse<TvShow[]>> {
        const url = `${this.basePath}/3/trending/tv/day?language=tr-tr`
        return this._http.get<GenericResponse<TvShow[]>>(url);
    }

    getPopularMovies(): Observable<GenericResponse<Movie[]>> {
        const url = `${this.basePath}/3/movie/popular?language=tr-tr&page=1`
        return this._http.get<GenericResponse<Movie[]>>(url);
    }

    getPopularTvShows(): Observable<GenericResponse<TvShow[]>> {
        const url = `${this.basePath}/3/tv/popular?language=tr-tr&page=1`
        return this._http.get<GenericResponse<TvShow[]>>(url);
    }
}

