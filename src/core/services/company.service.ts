import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { CompanyDetailsResponse } from "../interfaces/company-details.interface";

@Injectable({
    providedIn: "root"
})
export class CompanyService {

    private basePath = environment.apiBasePath;

    constructor(
        private http: HttpClient,
    ) { }

    getCompanyDetails(companyId: number): Observable<CompanyDetailsResponse> {
        const url = `${this.basePath}/company/${companyId}`
        return this.http.get<CompanyDetailsResponse>(url)
    }

}