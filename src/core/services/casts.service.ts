import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "../../environments/environment";
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
}