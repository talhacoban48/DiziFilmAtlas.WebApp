export interface CastDetail {
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

export interface CastImage {
    aspect_ratio: number,
    height: number,
    iso_639_1: number,
    file_path: string,
    vote_average: number,
    vote_count: number,
    width: number
}

export interface CastImages {
    id: number,
    profiles: CastImage[]
}

export interface CastCastMovie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: string[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number,
    character: string,
    credit_id: string,
    order: number
}

export interface CastCrewMovie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: string[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number,
    credit_id: string,
    department: string,
    job: string
}

export interface CastMovies {
    cast: CastCastMovie[],
    crew: CastCrewMovie[],
    id: number
}

export interface CastCastTvShow {
    adult: boolean;
    backdrop_path: string;
    genre_ids: string[];
    id: number;
    origin_country: string[],
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    first_air_date: string;
    name: string;
    vote_average: number;
    vote_count: number,
    character: string,
    credit_id: string,
    episode_count: number
}

export interface CastCrewTvShow {
    adult: boolean;
    backdrop_path: string;
    genre_ids: string[];
    id: number;
    origin_country: string[],
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    first_air_date: string;
    name: string;
    vote_average: number;
    vote_count: number,
    credit_id: string,
    department: string
    episode_count: number,
    job: string
}

export interface CastTvShows {
    cast: CastCastTvShow[],
    crew: CastCrewTvShow[],
    id: number
}

export interface CastFullDetails {
    details: CastDetail;
    images: CastImages;
    movies: CastMovies;
    tvShows: CastTvShows;
}