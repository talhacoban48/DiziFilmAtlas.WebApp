import { Image } from "./images-response.interface";
import { Movie } from "./movie.interface";
import { TvShow } from "./tvshows.interface";

export interface CastDetailResponse {
    adult: boolean,
    also_known_as: string[],
    biography: string,
    birthday: string,
    deathday: string,
    gender: number,
    homepage: string,
    id: number,
    imdb_id: string,
    known_for_department: string,
    name: string,
    place_of_birth: string,
    popularity: number,
    profile_path: string
}


export interface CastImages {
    id: number,
    profiles: Image[]
}

export interface CastMovies {
    cast: Movie[],
    crew: Movie[],
    id: number
}

export interface CastTvShows {
    cast: TvShow[],
    crew: TvShow[],
    id: number
}

export interface CastFullDetails {
    details: CastDetailResponse;
    images: CastImages;
    movies: CastMovies;
    tvShows: CastTvShows;
}