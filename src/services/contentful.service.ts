import { Injectable } from '@angular/core';
import { ContentfulRequest } from '../contentful-request';
import { ContentfulConfig } from '../contentful-config';
import { Inject } from '@angular/core';

/**
 *
 */
@Injectable()
export class ContentfulService {
  private contentfulConfig: ContentfulConfig;

  public constructor(@Inject('ContentfulConfiguration') config: any) {
    this.contentfulConfig = new ContentfulConfig(config.spaceId, config.accessToken, config.host);
  }

  public create(): ContentfulRequest {
    return new ContentfulRequest(this.contentfulConfig);
  }

  public getServiceConfig(): ContentfulConfig {
    return this.contentfulConfig;
  }

  public isServiceConfigured(): boolean {
    return this.contentfulConfig !== undefined ? true : false;
  }
}
