export interface IContentfulConfig {
  space: string;
  accessToken: string;
  secure?: boolean;
  host?: string;
}


export class Ng2ContentfulConfig {
  private static _config: IContentfulConfig;

  static get isConfigured() {
    return this._config != null;
  }

  static get config() {
    return this._config;
  }

  static set config(config: IContentfulConfig) {
    this._config = config;
  }
}
