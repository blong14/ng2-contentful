import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Ng2ContentfulConfig } from '../ng2-contentful-config';

export interface SearchItem {
  param: string;
  value: string;
}

/**
 *
 */
export class ContentfulRequest {
  private static HOST: string = 'cdn.contentful.com';
  private requestUrl: string;
  private queryParams: URLSearchParams = new URLSearchParams();

  public constructor(private _http: Http) {
    this.queryParams.set(
      'access_token', Ng2ContentfulConfig.config.accessToken
    );
  }

  public getContentTypes(): ContentfulRequest {
    this.requestUrl = '/content_types/';
    return this;
  }

  public getContentType(contentTypeId: String): ContentfulRequest {
    this.requestUrl = `/content_types/${contentTypeId}`;
    return this;
  }

  /**
   *
   * @returns {ContentfulRequest}
   */
  public getAssets(): ContentfulRequest {
    this.requestUrl = '/assets/';
    return this;
  }

  /**
   *
   * @param assetId
   * @returns {ContentfulRequest}
   */
  public getAsset(assetId: String): ContentfulRequest {
    this.requestUrl = `/assets/${assetId}`;
    return this;
  }

  /**
   * Based on
   * @param type - contentful content type identifier
   * @returns {ContentfulRequest}
   */
  public getEntriesByType(type: string): ContentfulRequest {
    this.requestUrl = '/entries/';
    this.queryParams.set('content_type', type);
    return this;
  }

  /**
   *  Fetch entry by entryID
   *  Based on https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/entries/entry/get-a-single-entry
   * @param entryId - contentful entry id
   * @returns {ContentfulRequest}
   */
  public getEntry(entryId: string): ContentfulRequest {
    this.requestUrl = `/entries/${entryId}`;
    return this;
  }

  /**
   *
   * @param type
   * @param slug
   * @returns {ContentfulRequest}
   */
  public getEntryBySlug(type: string, slug: string): ContentfulRequest {
    this.queryParams.set('content_type', type);
    this.queryParams.set('fields.slug', slug);
    this.requestUrl = '/entries/';
    this.limit(1);
    return this;
  }

  /**
   *
   * @param type
   * @param searchItems
   * @returns {ContentfulRequest}
   */
  public searchEntries(type: string, ...searchItems: SearchItem[]): ContentfulRequest {
    this.queryParams.set(
      'content_type', type
    );
    for (let searchItem of searchItems) {
      this.queryParams.set(searchItem.param, searchItem.value);
    }
    this.requestUrl = '/entries/';
    return this;
  }

  public include(include: number): ContentfulRequest {
    this.queryParams.set('include', include.toString());
    return this;
  }

  public limit(limit: number): ContentfulRequest {
    this.queryParams.set('limit', limit.toString());
    return this;
  }

  public order(order: string): ContentfulRequest {
    this.queryParams.set('order', order);
    return this;
  }

  /**
   * Call request to the contentful's API
   * @returns {Observable<Response>}
   */
  public commit(): Observable<Response> {
    let url = [
      'https://',
      Ng2ContentfulConfig.config.host || ContentfulRequest.HOST,
      '/spaces/',
      Ng2ContentfulConfig.config.space,
      this.requestUrl
    ].join('');

    let options: RequestOptionsArgs = {
      headers: new Headers({
        'Content-Type': 'application/vnd.contentful.delivery.v1+json'
      }),
      search: this.queryParams
    };
    return this._http.get(url, options);
  }
}

@Injectable()
export class ContentfulService {
  public constructor(private _http: Http) {
  }

  /**
   *
   */
  public create(): ContentfulRequest {
    return new ContentfulRequest(this._http);
  }
}
