export interface IEnvironment {
    production: boolean;
    environmentName: Stage | Prod;
    basePath: string,
    apiBasePath: string;
    apiKey: string;
    cdnUrl: string;
    restCountriesPath: string;
    firebaseConfig: {
        apiKey: string;
        authDomain: string;
        databaseURL: string;
        projectId: string;
        storageBucket: string;
        messagingSenderId: string;
        appId: string;
        measurementId: string;
    }
}

export enum Stage {
    Development = 'Development',
    Local = 'Local',
}

export enum Prod {
    Production = "Production"
}
