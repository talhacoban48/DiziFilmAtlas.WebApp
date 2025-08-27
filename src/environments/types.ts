export interface IEnvironment {
    production: boolean;
    environmentName: Stage | Prod;
    basePath: string,
    apiBasePath: string;
    apiKey: string;
    cdnUrl: string;
    restCountriesPath: string;

}

export enum Stage {
    Development = 'Development',
    Local = 'Local',
}

export enum Prod {
    Production = "Production"
}