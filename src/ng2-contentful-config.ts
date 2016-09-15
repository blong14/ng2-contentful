export interface ContentfulConfig {
  space: string;
  accessToken: string;
  secure?: boolean;
  host?: string;
}

export class Ng2ContentfulConfig {
  private static _config: ContentfulConfig;

  public static get isConfigured(): boolean {
    return this._config !== undefined;
  }

  public static get config(): ContentfulConfig {
    return this._config;
  }

  public static set config(config: ContentfulConfig) {
    this._config = config;
  }
}
