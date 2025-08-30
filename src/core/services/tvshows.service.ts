import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { tvGenres } from '../data/genres';
import { CastsCrews, CastsCrewsResponse, Crew } from '../interfaces/cast-crews.interface';
import { GenericResponse } from '../interfaces/generic-response.interface';
import { Image, ImagesResponse } from '../interfaces/images-response.interface';
import { Provider, ProviderResponse } from '../interfaces/providers.interface';
import { ReviewsResponse } from '../interfaces/reviews-response.interface';
import { TvShowDetailsResponse } from '../interfaces/tvshow-details.interface';
import { TvShow } from '../interfaces/tvshows.interface';
import { Video, VideosResponse } from '../interfaces/videos-response.interface';

@Injectable({
    providedIn: 'root'
})
export class TvShowsService {

    private genres = tvGenres;
    private basePath = environment.apiBasePath;
    private countryUrl = environment.restCountriesPath;

    constructor(
        private http: HttpClient,
    ) {

    }

    getTrendingTvShows(): Observable<GenericResponse<TvShow[]>> {
        const url = `${this.basePath}/trending/tv/day?language=tr-tr`
        return this.getTvShows(url);
    };

    getAiringTodayTvShows(page: number): Observable<GenericResponse<TvShow[]>> {
        const url = `${this.basePath}/tv/airing_today?language=tr-tr&page=${page}`
        return this.getTvShows(url);
    };

    getOnTheAirTvShows(page: number): Observable<GenericResponse<TvShow[]>> {
        const url = `${this.basePath}/tv/on_the_air?language=tr-tr&page=${page}`
        return this.getTvShows(url);
    };

    getPopularTvShows(page: number): Observable<GenericResponse<TvShow[]>> {
        const url = `${this.basePath}/tv/popular?language=tr-tr&page=${page}`
        return this.getTvShows(url);
    };

    getTopRatedTvShows(page: number): Observable<GenericResponse<TvShow[]>> {
        const url = `${this.basePath}/tv/top_rated?language=tr-tr&page=${page}`
        return this.getTvShows(url);
    };

    getSimilarTvShows(tvShowId: number, page: number): Observable<GenericResponse<TvShow[]>> {
        const url = `${this.basePath}/tv/${tvShowId}/similar?language=tr-tr&page=${page}`
        return this.getTvShows(url);
    };

    getTvShowDetails(tvShowId: number): Observable<TvShowDetailsResponse> {
        const url = `${this.basePath}/tv/${tvShowId}?language=tr-tr`
        return this.http.get<TvShowDetailsResponse>(url).pipe(
            map(result => {
                for (let i in result.production_countries) {
                    let country_data = result.production_countries[i];
                    this.http.get(this.countryUrl + country_data.iso_3166_1).subscribe(country => {
                        let country_flag = (country as Array<any>)[0].flags.png;
                        if (country_flag) {
                            result.production_countries[i].flag_path = country_flag;
                        }
                    })
                }
                return result;
            })
        );
    }

    getTvShowCasts(tvShowId: Number): Observable<CastsCrews> {
        const url = `${this.basePath}/tv/${tvShowId}/aggregate_credits?language=tr-tr`
        return this.http.get<CastsCrewsResponse>(url)
            .pipe(
                map(result => {
                    let crews: Crew[] = [];

                    for (let cast of result.cast) {
                        if (cast.roles && cast.roles.length > 0) {
                            cast.character = cast.roles?.at(0)?.character ?? "";
                        }
                    }

                    for (let crew of result.crew) {
                        if (crew.known_for_department == "Directing" || crew.known_for_department == "Writing") {
                            const isCrewExist = crews.some(c => c.id == crew.id && c.known_for_department == crew.known_for_department)
                            const isSamePerson = crews.some(c => c.id == crew.id && c.known_for_department != crew.known_for_department);
                            if (crew.known_for_department == "Directing" && !isCrewExist) {
                                crew.department = "Yönetmen"
                                if (isSamePerson) {
                                    crew.department = "Yazar & Yönetmen"
                                    crews = crews.filter(c => c.id != crew.id);
                                    crews.push(crew);
                                } else {
                                    crews.push(crew);
                                }
                            }
                            if (crew.known_for_department == "Writing" && !isCrewExist) {
                                crew.department = "Yazar"
                                if (isSamePerson) {
                                    crew.department = "Yazar & Yönetmen"
                                    crews = crews.filter(c => c.id != crew.id);
                                    crews.push(crew);
                                } else {
                                    crews.push(crew);
                                }
                            }
                        }
                    }
                    const data: CastsCrews = {
                        id: result.id,
                        casts: result.cast.filter(c => c.known_for_department == "Acting" && !!c.profile_path),
                        crews: crews.filter(c => !!c.profile_path),
                    }
                    return data
                })
            );
    }

    getTvShowImages(tvShowId: number): Observable<Image[]> {
        const url = `${this.basePath}/tv/${tvShowId}/images`
        return this.http.get<ImagesResponse>(url).pipe(
            map(images => {
                const data: Image[] = [...new Map(images.backdrops.map(img => [img.file_path, img])).values()];
                return data;
            })
        );
    }

    getTvShowvideos(tvShowId: number): Observable<Video[]> {
        const url = `${this.basePath}/tv/${tvShowId}/videos?language=tr-tr`
        return this.http.get<VideosResponse>(url).pipe(
            map(videos => {
                let videos_data: Video[] = [];
                for (let video of videos.results) {
                    if (video.site == "YouTube") {
                        videos_data.push(video);
                    }
                }
                return videos_data;
            })
        );
    }

    getTvShowReviews(tvShowId: number, page: number): Observable<ReviewsResponse> {
        const url = `${this.basePath}/tv/${tvShowId}/reviews?language=en-US&page=${page}`
        return this.http.get<ReviewsResponse>(url)
            .pipe(
                map(res => {
                    return res;
                })
            );
    }

    getProviders(tvShowId: number): Observable<Provider[]> {
        const url = `${this.basePath}/tv/${tvShowId}/watch/providers`;
        return this.http.get<ProviderResponse>(url).pipe(
            map(res => {
                const tr = res.results?.['TR'];
                if (!tr) return [];

                const merged = [
                    ...(tr.flatrate || []),
                    ...(tr.buy || []),
                    ...(tr.rent || [])
                ];

                const unique = Array.from(
                    new Map(merged.map(p => [p.provider_id, p])).values()
                );

                return unique;
            })
        );
    }

    private getTvShows(url: string): Observable<GenericResponse<TvShow[]>> {
        return this.http.get<GenericResponse<TvShow[]>>(url)
            .pipe(
                map(response => {
                    const data: TvShow[] = [];
                    for (let row_data of response.results) {
                        const tvshow = row_data;
                        const genres: string[] = [];
                        if (row_data.backdrop_path) {
                            for (let genre of row_data.genre_ids) {
                                const genreName = this.genres.find(g => g.id == genre)?.name;
                                if (genreName) genres.push(genreName);
                            }
                            data.push({ ...row_data, genre_names: genres });
                        }
                    }
                    return {
                        page: response.page,
                        results: data,
                        total_pages: response.total_pages,
                        total_results: response.total_results
                    };
                })
            );
    };
}
