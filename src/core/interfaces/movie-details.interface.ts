import { Movie } from "./movie.interface"


interface Belongs_to_Collection {
    backdrop_path: string,
    id: number,
    name: string,
    poster_path: string
}

interface Genre {
    id: number,
    name: string
}

interface Production_Company {
    id: number,
    logo_path: string,
    name: string,
    origin_country: string
}

interface Production_Country {
    iso_3166_1: string,
    name: string,
    flag_path: string
}

interface Spoken_Languages {
    english_name: string,
    iso_639_1: string,
    name: string,
}

export interface MovieDetailsResponse {
    adult: boolean,
    backdrop_path: string,
    belongs_to_collection?: Belongs_to_Collection,
    budget: number,
    genres: Genre[],
    homepage: string,
    id: number,
    imdb_id: string,
    origin_country: string[],
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    production_companies: Production_Company[],
    production_countries: Production_Country[],
    release_date: string,
    revenue: number,
    runtime: number,
    spoken_languages: Spoken_Languages[],
    status: string,
    tagline: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}

export interface CollectionDetailsResponse {
    id: string,
    name: string,
    overview: string,
    poster_path: string,
    backdrop_path: string,
    parts: Movie[]
}