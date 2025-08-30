import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { movieGenres } from '../data/genres';
import { CastsCrews, CastsCrewsResponse, Crew } from '../interfaces/cast-crews.interface';
import { GenericResponse } from '../interfaces/generic-response.interface';
import { Image, ImagesResponse } from '../interfaces/images-response.interface';
import { CollectionDetailsResponse, MovieDetailsResponse } from '../interfaces/movie-details.interface';
import { Movie } from '../interfaces/movie.interface';
import { Provider, ProviderResponse } from '../interfaces/providers.interface';
import { ReviewsResponse } from '../interfaces/reviews-response.interface';
import { Video, VideosResponse } from '../interfaces/videos-response.interface';

@Injectable({
    providedIn: 'root'
})
export class MoviesService {

    private genres = movieGenres;
    private basePath = environment.apiBasePath;
    private countryUrl = environment.restCountriesPath;

    constructor(
        private http: HttpClient,
    ) {

    }

    getTrendingMovies(): Observable<GenericResponse<Movie[]>> {
        const url = `${this.basePath}/trending/movie/day?language=tr-tr`
        return this.getMovies(url);
    };

    getUpcomingMovies(page: number): Observable<GenericResponse<Movie[]>> {
        const url = `${this.basePath}/movie/upcoming?language=tr-tr&page=${page}`
        return this.getMovies(url);
    };

    getPopularMovies(page: number): Observable<GenericResponse<Movie[]>> {
        const url = `${this.basePath}/movie/popular?language=tr-tr&page=${page}`
        return this.getMovies(url);
    };

    getTopRatedMovies(page: number): Observable<GenericResponse<Movie[]>> {
        const url = `${this.basePath}/movie/top_rated?language=tr-tr&page=${page}`
        return this.getMovies(url);
    };

    getNowPlayingMovies(page: number): Observable<GenericResponse<Movie[]>> {
        const url = `${this.basePath}/movie/now_playing?language=tr-tr&page=${page}`
        return this.getMovies(url);
    };

    getSimilarMovies(movieId: number, page: number): Observable<GenericResponse<Movie[]>> {
        const url = `${this.basePath}/movie/${String(movieId)}/similar?language=tr-tr&page=${page}`
        return this.getMovies(url);
    };

    getMovieDetails(movieId: number): Observable<MovieDetailsResponse> {
        const url = `${this.basePath}/movie/${movieId}?language=tr-tr`
        return this.http.get<MovieDetailsResponse>(url).pipe(
            map(result => {
                for (let i in result.production_countries) {
                    let country_data = result.production_countries[i];
                    this.http.get(this.countryUrl + country_data.iso_3166_1).subscribe((country) => {
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

    getMovieCasts(movieId: Number): Observable<CastsCrews> {
        const url = `${this.basePath}/movie/${movieId}/credits?language=tr-tr`
        return this.http.get<CastsCrewsResponse>(url)
            .pipe(
                map(result => {
                    let crews: Crew[] = [];

                    for (let crew of result.crew) {
                        if (crew.department == "Directing" || crew.department == "Writing") {
                            const isCrewExist = crews.some(c => c.id == crew.id && c.department == crew.department)
                            const isSamePerson = crews.some(c => c.id == crew.id && c.department != crew.department);
                            if (crew.department == "Directing" && !isCrewExist) {
                                crew.known_for_department = "Yönetmen"
                                if (isSamePerson) {
                                    crew.known_for_department = "Yazar & Yönetmen"
                                    crews = crews.filter(c => c.id != crew.id);
                                    crews.push(crew);
                                } else {
                                    crews.push(crew);
                                }
                            }
                            if (crew.department == "Writing" && !isCrewExist) {
                                crew.known_for_department = "Yazar"
                                if (isSamePerson) {
                                    crew.known_for_department = "Yazar & Yönetmen"
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

    getMovieImages(movieId: number): Observable<Image[]> {
        const url = `${this.basePath}/movie/${movieId}/images`
        return this.http.get<ImagesResponse>(url).pipe(
            map(images => {
                const data: Image[] = [...new Map(images.backdrops.map(img => [img.file_path, img])).values()];
                data.forEach(image => {

                });
                return data;
            })
        );
    }

    getMovievideos(movieId: number): Observable<Video[]> {
        const url = `${this.basePath}/movie/${movieId}/videos?language=tr-tr`
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

    getMovieReviews(movieId: number, page: number): Observable<ReviewsResponse> {
        const url = `${this.basePath}/movie/${movieId}/reviews?language=en-US&page=${page}`
        return this.http.get<ReviewsResponse>(url)
            .pipe(
                map(res => {
                    return res;
                })
            );
    }

    getProviders(movieId: number): Observable<Provider[]> {
        const url = `${this.basePath}/movie/${movieId}/watch/providers`;
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

    getCollectionDetails(collectionId: number): Observable<CollectionDetailsResponse> {
        const url = `${this.basePath}/collection/${collectionId}?language=tr-tr`;
        return this.http.get<CollectionDetailsResponse>(url);
    }

    private getMovies(url: string): Observable<GenericResponse<Movie[]>> {
        return this.http.get<GenericResponse<Movie[]>>(url)
            .pipe(
                map(response => {
                    const data: Movie[] = [];
                    for (let row_data of response.results) {
                        const movie = row_data;
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
