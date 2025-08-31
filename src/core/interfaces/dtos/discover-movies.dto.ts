import { SortByEnum } from "../../enums/sort-by.enum";

export class DiscoverMoviesDto {
    certification?: string;
    certification_country?: string;
    include_adult: boolean = true;
    include_video: boolean = true;
    language: string = "tr-tr";
    page: number = 1;
    primary_release_year?: number;
    primary_release_date_gte?: Date;
    primary_release_date_lte?: Date;
    region?: string;
    release_date_gte?: Date;
    release_date_lte?: Date;
    sort_by?: SortByEnum;
    vote_average_gte?: number;
    vote_average_lte?: number;
    vote_count_gte?: number;
    vote_count_lte?: number;
    with_companies?: number;
    with_genres?: number;
    with_keywords?: string;
    with_origin_country?: string;
    with_people?: number;
    with_original_language?: number;
    watch_region?: string;
    with_watch_providers?: number;

    toQueryParams(): string {
        const params: string[] = [];

        Object.entries(this).forEach(([key, value]) => {
            if (value === undefined || value === null) return;

            if (Array.isArray(value)) {
                value = value.join(",");
            }

            if (value instanceof Date) {
                value = value.toISOString().split("T")[0];
            }

            let paramKey = key
                .replace("_gte", ".gte")
                .replace("_lte", ".lte");

            params.push(`${paramKey}=${encodeURIComponent(value as any)}`);
        });

        return params.join("&");
    }
}
