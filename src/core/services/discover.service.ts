import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { DiscoverMoviesDto } from "../interfaces/dtos/discover-movies.dto";
import { DiscoverTvShowsDto } from "../interfaces/dtos/discover-tvshows.dto";
import { GenericResponse } from "../interfaces/generic-response.interface";
import { Movie } from "../interfaces/movie.interface";
import { TvShow } from "../interfaces/tvshows.interface";

@Injectable({
    providedIn: "root"
})
export class DiscoverService {

    private basePath = environment.apiBasePath;

    constructor(
        private http: HttpClient
    ) { }

    discoverMovies(payload: DiscoverMoviesDto): Observable<GenericResponse<Movie[]>> {
        const query = payload.toQueryParams();
        const url = `${this.basePath}/discover/movie?${query}`
        console.log(url);

        return this.http.get<GenericResponse<Movie[]>>(url)
    }

    discoverTvshows(payload: DiscoverTvShowsDto): Observable<GenericResponse<TvShow[]>> {
        const query = payload.toQueryParams();
        const url = `${this.basePath}/discover/tv?${query}`
        console.log(url);

        return this.http.get<GenericResponse<TvShow[]>>(url)
    }

}