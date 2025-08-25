import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, map, Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { CastDetail, CastFullDetails, CastImages, CastMovies, CastTvShows } from "../interfaces/cast-details.interface";
import { Cast } from "../interfaces/cast.interface";
import { GenericResponse } from "../interfaces/generic-response.interface";

@Injectable({
    providedIn: "root"
})
export class CastService {

    private basePath = environment.apiBasePath;

    constructor(
        private http: HttpClient
    ) { }

    getPopularCelebritiesList(page: number): Observable<GenericResponse<Cast[]>> {
        const url = `${this.basePath}/person/popular?language=tr-tr&page=${page}`
        return this.http.get<GenericResponse<Cast[]>>(url)
            .pipe(
                map(res => {
                    res.results = res.results.filter(c => !!c.profile_path);
                    return res;
                })
            );
    }

    getTrendingCelebritiesList(page: number): Observable<GenericResponse<Cast[]>> {
        const url = `${this.basePath}/trending/person/week?language=tr-tr&page=${page}`
        return this.http.get<GenericResponse<Cast[]>>(url)
            .pipe(
                map(res => {
                    res.results = res.results.filter(c => !!c.profile_path);
                    return res;
                })
            );
    }

    getCastDetails(personId: number): Observable<CastFullDetails> {
        return forkJoin({
            details: this.getCastBasicDetails(personId),
            images: this.getCastImages(personId),
            movies: this.getCastMovies(personId),
            tvShows: this.getCastTvShows(personId),
        });
    }

    private getCastBasicDetails(personId: number): Observable<CastDetail> {
        const url = `${this.basePath}/person/${personId}?language=tr-tr`;
        return this.http.get<CastDetail>(url);
    }

    private getCastImages(personId: number): Observable<CastImages> {
        const url = `${this.basePath}/person/${personId}/images`;
        return this.http.get<CastImages>(url);
    }

    private getCastMovies(personId: number): Observable<CastMovies> {
        const url = `${this.basePath}/person/${personId}/movie_credits?language=tr-tr`;
        return this.http.get<CastMovies>(url);
    }

    private getCastTvShows(personId: number): Observable<CastTvShows> {
        const url = `${this.basePath}/person/${personId}/tv_credits?language=tr-tr`;
        return this.http.get<CastTvShows>(url);
    }


}