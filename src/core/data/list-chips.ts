export interface ListChip {
    label: string,
    name: string
}

export const menuForMovies: ListChip[] = [
    { name: "nowplaying", label: "Vizyonda" },
    { name: "popular", label: "Popüler" },
    { name: "toprated", label: "En Yüksek Puan Alanlar" },
    { name: "upcoming", label: "Yakında" },
    { name: "discover", label: "Keşfet" },
];

export const menuForTvShows: ListChip[] = [
    { name: "airingtoday", label: "Bugün Popüler" },
    { name: "airing", label: "Popüler" },
    { name: "toprated", label: "En Yüksek Puan Alanlar" },
    { name: "upcoming", label: "Yakında" },
    { name: "discover", label: "Keşfet" },
];

export const menuForCasts: ListChip[] = [
    { name: "popular", label: "Popüler" },
    { name: "trending", label: "Bu Haftanın Yükselenleri" }
];

export const menuForSearch: ListChip[] = [
    { name: "movies", label: "Filmler" },
    { name: "tvshows", label: "Diziler" },
    { name: "casts", label: "Oyuncular" },
    { name: "companies", label: "Şirketler" },
];