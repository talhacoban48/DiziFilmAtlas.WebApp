export interface IEnvironment {
    production: boolean;
    environmentName: Stage | Prod;
    apiBasePath: string;
    apiKey: string;
    cdnUrl: string;
}

export enum Stage {
    Development = 'Development',
    Local = 'Local',
}

export enum Prod {
    Production = "Production"
}