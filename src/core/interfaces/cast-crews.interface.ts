
export interface Crew {
    adult: boolean,
    cast_id: number,
    department: string,
    gender: number,
    id: number,
    job: string,
    known_for_department: string,
    name: string,
    original_name: string,
    popularity: number,
    profile_path: string
}

export interface Cast {
    adult: boolean,
    cast_id: number,
    character: string,
    credit_id: string,
    gender: number,
    id: number,
    known_for_department: string,
    name: string,
    order: string,
    original_name: string,
    popularity: number,
    profile_path: string
}

export interface CastsCrews {
    id: number,
    casts: Cast[],
    crews: Crew[],
}

export interface CastsCrewsResponse {
    id: number,
    cast: Cast[],
    crew: Crew[],
}