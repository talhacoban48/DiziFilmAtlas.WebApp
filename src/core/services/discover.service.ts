import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { DiscoverMoviesDto } from "../interfaces/dtos/discover-movies.dto";
import { DiscoverTvShowsDto } from "../interfaces/dtos/discover-tvshows.dto";
import { GenericResponse } from "../interfaces/generic-response.interface";
import { Movie } from "../interfaces/movie.interface";
import { ProvidersResponse } from "../interfaces/providers.interface";
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
        return this.http.get<GenericResponse<Movie[]>>(url)
    }

    discoverTvshows(payload: DiscoverTvShowsDto): Observable<GenericResponse<TvShow[]>> {
        const query = payload.toQueryParams();
        const url = `${this.basePath}/discover/tv?${query}`
        return this.http.get<GenericResponse<TvShow[]>>(url)
    }

    getProviders(kind: "movie" | "tv"): Observable<ProvidersResponse> {
        const url = `${this.basePath}/watch/providers/${kind}?language=tr-tr&watch_region=tr`
        return this.http.get<ProvidersResponse>(url)
    }

    getYears() {
        const years: number[] = [];
        const date = (new Date()).getFullYear();
        for (let i = 0; i < 50; i++) {
            years?.push(date - i);
        }
        return years;
    }

}