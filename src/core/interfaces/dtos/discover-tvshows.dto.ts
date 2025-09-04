import { SortByEnum } from "../../enums/sort-by.enum";

export class DiscoverTvShowsDto {
    sort_by?: SortByEnum;
    vote_average_gte?: number;
    vote_average_lte?: number;
    vote_count_gte?: number;
    vote_count_lte?: number;
    with_companies?: number;
    with_genres?: number;
    with_origin_country?: string;
    with_original_language?: number;
    watch_region?: string;
    private _with_watch_providers?: number;
    get with_watch_providers(): number | undefined {
        return this._with_watch_providers;
    }
    set with_watch_providers(value: number | string | undefined | null) {
        if (value === undefined || value === null || value === "undefined") {
            this._with_watch_providers = undefined;
            this.watch_region = undefined;
        } else {
            this._with_watch_providers = Number(value);
            this.watch_region = "TR";
        }
    }
    private _first_air_date_year?: number;
    private _first_air_date_gte?: Date;
    private _first_air_date_lte?: Date;

    get first_air_date_year(): number | undefined {
        return this._first_air_date_year;
    }
    set first_air_date_year(value: number | undefined) {
        this._first_air_date_year = value;
        this.updateIncludeNullFirstAirDates();
    }

    get first_air_date_gte(): Date | undefined {
        return this._first_air_date_gte;
    }
    set first_air_date_gte(value: Date | undefined) {
        this._first_air_date_gte = value;
        this.updateIncludeNullFirstAirDates();
    }

    get first_air_date_lte(): Date | undefined {
        return this._first_air_date_lte;
    }
    set first_air_date_lte(value: Date | undefined) {
        this._first_air_date_lte = value;
        this.updateIncludeNullFirstAirDates();
    }

    include_null_first_air_dates: boolean = true;

    private updateIncludeNullFirstAirDates(): void {
        this.include_null_first_air_dates =
            !!(this._first_air_date_year || this._first_air_date_gte || this._first_air_date_lte)
                ? false
                : true;
    }
    include_adult: boolean = false; // bunlar hep sabit, dışarıdan parametre alma
    language: string = "tr-tr"; // bunlar hep sabit, dışarıdan parametre alma
    page: number = 1;

    constructor(init?: Partial<Omit<DiscoverTvShowsDto, "include_adult" | "include_video" | "language">>) {
        Object.assign(this, init);
    }

    toQueryParams(): string {
        const params: string[] = [];

        Object.entries(this).forEach(([key, value]) => {
            if (value === undefined || value === "undefined" || value === null) return;

            if (Array.isArray(value)) {
                value = value.join(",");
            }

            if (value instanceof Date) {
                value = value.toISOString().split("T")[0];
            }

            let paramKey = key
                .replace("_gte", ".gte")
                .replace("_lte", ".lte")
                .replace(/^_first_/, "first_")
                .replace(/^_with_/, "with_");

            params.push(`${paramKey}=${encodeURIComponent(value as any)}`);
        });

        return params.join("&");
    }
}
