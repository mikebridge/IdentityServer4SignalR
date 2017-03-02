export enum Mode {
    Production,
    Development
}

const currentMode = process.env.mode == null ||
    process.env.mode.toLowerCase() === "dev" ? Mode.Development : Mode.Production;

export const globalConfig = {
    currentMode,
    baseIdentityUrl: currentMode ===    Mode.Development ? "http://localhost:5004" : "https://auth.example.org",
    baseChatApiUrl: currentMode ===     Mode.Development ? "http://localhost:5000" : "https://chatapi.example.org",
    baseApiUrl: currentMode ===         Mode.Development ? "http://localhost:5001" : "https://api.example.org",
    currentBaseUrl: `${window.location.protocol}//${window.location.hostname}${window.location.port ? 
        `:${window.location.port}` : ""}`
};
