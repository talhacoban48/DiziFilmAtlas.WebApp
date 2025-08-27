import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { CompanyDetails } from "../../features/company-details/company-details";

@Injectable({
    providedIn: "root"
})
export class CompanyService {

    private basePath = environment.apiBasePath;

    constructor(
        private http: HttpClient,
    ) { }

    getCompanyDetails(companyId: number): Observable<CompanyDetails> {
        const url = `${this.basePath}/company/${companyId}`
        return this.http.get<CompanyDetails>(url)
    }

}