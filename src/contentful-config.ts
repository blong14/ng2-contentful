
export class ContentfulConfig {
  private space: string;
  private accessToken: string;
  private host: string;
  private secure: boolean;
  private resolveLinks: boolean;
  private agent: string;

  public constructor(space: string,
                     accessToken: string,
                     host?: string,
                     secure?: boolean,
                     resolveLinks?: boolean,
                     agent?: string) {
    this.space = space;
    this.accessToken = accessToken;
    this.secure = secure;
    this.host = host || "";
    this.resolveLinks = resolveLinks || true;
    this.agent = agent || "";
  }

  public getConfigObject(): any {
    return {
      space: this.space,
      accessToken: this.accessToken,
      secure: this.secure,
      host: this.host,
      resolveLinks: this.resolveLinks,
      agent: this.agent
    };
  }
}
