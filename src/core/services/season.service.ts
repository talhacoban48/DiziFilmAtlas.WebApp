import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { SeasonDetailsResponse } from "../interfaces/seson-details.interface";

@Injectable({
    providedIn: "root"
})
export class SeasonService {

    private basePath = environment.apiBasePath;

    constructor(
        private http: HttpClient,
    ) { }

    getSeasonDetails(seriesId: number, seasonNumber: number): Observable<SeasonDetailsResponse> {
        const url = `${this.basePath}/tv/${seriesId}/season/${seasonNumber}?language=tr-TR`
        return this.http.get<SeasonDetailsResponse>(url)
    }

}