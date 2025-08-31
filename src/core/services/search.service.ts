import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Cast } from "../interfaces/cast.interface";
import { GenericResponse } from "../interfaces/generic-response.interface";
import { Movie } from "../interfaces/movie.interface";
import { TvShow } from "../interfaces/tvshows.interface";


@Injectable()
export class SearchService {

    private basePath = environment.apiBasePath;

    constructor(
        private http: HttpClient,
    ) { }

    searchMovies(key: string, page: number): Observable<GenericResponse<Movie[]>> {
        const url = `${this.basePath}/search/movie?query=${key}&include_adult=true&language=tr-tr&page=${page}`;
        return this.http.get<GenericResponse<Movie[]>>(url)
    }

    searchTvShows(key: string, page: number): Observable<GenericResponse<TvShow[]>> {
        const url = `${this.basePath}/search/tv?query=${key}&include_adult=true&language=tr-tr&page=${page}`;
        return this.http.get<GenericResponse<TvShow[]>>(url)
    }

    searchCasts(key: string, page: number): Observable<GenericResponse<Cast[]>> {
        const url = `${this.basePath}/search/person?query=${key}&include_adult=true&language=tr-tr&page=${page}`;
        return this.http.get<GenericResponse<Cast[]>>(url)
    }

}