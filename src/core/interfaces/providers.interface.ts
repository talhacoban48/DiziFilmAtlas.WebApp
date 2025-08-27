export interface ProviderResponse {
    id: number;
    results: {
        [countryCode: string]: ProviderCountry;
    };
}

export interface ProviderCountry {
    link: string;
    flatrate?: Provider[];
    buy?: Provider[];
    rent?: Provider[];
}

export interface Provider {
    logo_path: string;
    provider_id: number;
    provider_name: string;
    display_priority: number;
}

