export interface ListChip {
    label: string,
    name: string
}

export const menuForMovies: ListChip[] = [
    { label: "nowplaying", name: "Vizyonda" },
    { label: "popular", name: "Popüler" },
    { label: "toprated", name: "En Yüksek Puan Alanlar" },
    { label: "upcoming", name: "Yakında" },
    { label: "discover", name: "Keşfet" },
];

export const menuForTvShows: ListChip[] = [
    { label: "airingtoday", name: "Bugün Popüler" },
    { label: "airing", name: "Popüler" },
    { label: "toprated", name: "En Yüksek Puan Alanlar" },
    { label: "upcoming", name: "Yakında" },
    { label: "discover", name: "Keşfet" },
];

export const menuForCasts: ListChip[] = [
    { label: "popular", name: "Popüler" },
    { label: "trending", name: "Bu Haftanın Yükselenleri" }
];