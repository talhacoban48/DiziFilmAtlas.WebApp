import { SortByEnum } from "../enums/sort-by.enum";

export const SortByData: { label: string; value: SortByEnum }[] = [
    { label: "İsme göre artan", value: SortByEnum.title_asc },
    { label: "İsme göre azalan", value: SortByEnum.title_desc },
    { label: "Popülerliğe göre artan", value: SortByEnum.popularity_asc },
    { label: "Popülerliğe göre azalan", value: SortByEnum.popularity_desc },
    { label: "Hasılata göre artan", value: SortByEnum.revenue_asc },
    { label: "Hasılata göre azalan", value: SortByEnum.revenue_desc },
    { label: "Tarihine göre artan", value: SortByEnum.primary_release_date_asc },
    { label: "Tarihine göre azalan", value: SortByEnum.primary_release_date_desc },
    { label: "Puanına göre artan", value: SortByEnum.vote_average_asc },
    { label: "Puanına göre azalan", value: SortByEnum.vote_average_desc },
    { label: "Oy sayısına göre artan", value: SortByEnum.vote_count_asc },
    { label: "Oy sayısına göre azalan", value: SortByEnum.vote_count_desc },
];