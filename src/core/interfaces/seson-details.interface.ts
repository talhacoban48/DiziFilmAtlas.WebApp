export interface SeasonDetailsResponse {
    _id: string,
    air_date: Date,
    episodes: Episode[],
    name: string,
    overview: string,
    id: number,
    poster_path: string,
    season_number: number,
    vote_average: number
}


export interface Episode {
    air_date: Date,
    episode_number: number,
    episode_type: string,
    id: number,
    name: string,
    overview: string,
    production_code: string,
    runtime: number,
    season_number: number,
    show_id: number,
    still_path: string,
    vote_average: number,
    vote_count: number
}
