/**
 * Created by vs on 9/21/16.
 */

import { Observable } from 'rxjs';
import { ContentfulConfig } from './contentful-config';
import { ContentfulRequest } from './contentful-request';

export class PersistentContentfulRequest extends ContentfulRequest {
  private forceFetch: boolean;
  private cachedFieldName: string;
  private cachedEntryId: string;

  private getCachedValue(cachedFieldName: string): Observable<any> {
    if (!cachedFieldName) {
      return undefined;
    }

    let cachedValue = JSON.parse(window.localStorage.getItem(cachedFieldName));

    // Need a better way of doing this -- the best way would be to synchronize data to a local database,
    // but in the meantime, we could post-process all cache data and put all of the entries into an
    // array keyed by their entry id.
    if (this.cachedEntryId) {
      let entries = JSON.parse(cachedValue);
      cachedValue = undefined; // clear this so that we can specify an entry as a cachedValue for this getEntry() request
      if (entries && entries.entries) {
        entries = entries.entries;
      }
      
      for (let i = 0; i < entries.length; i++) {
        let entry = entries[i];
        if (entry.sys.id === this.cachedEntryId) {
          cachedValue = JSON.stringify(entry);
          break;
        }
      }
    }

    if (!(this.forceFetch) && cachedValue) {
      console.log('Returning observable for cached value');
      return this.createObservable( new Promise( (resolve, reject) => { resolve(cachedValue); }));
    }

    return undefined;
  }

  private createObservable<T>(promise: Promise<T>): Observable<any> {
    return Observable.fromPromise(Promise.resolve(promise));
  }

  public constructor(contentfulConfig: ContentfulConfig, forceFetch = false) {
    super(contentfulConfig);
    this.forceFetch = forceFetch;
  }

  public commit(): Observable<any> {
    if (this.forceFetch) {
      return super.commit();
    }

    let result = undefined;

    if (this.cachedFieldName) {
      result = this.getCachedValue(this.cachedFieldName);
    }

    // No cached value, so return commit() from the parent class, which will execute the real contentful.js call
    if (!result) {
      result = super.commit();
    }

    return result;
  }

  public getContentTypes(): ContentfulRequest {
    this.cachedFieldName = 'content.contentTypes';
    return super.getContentTypes();
  }

  public getContentType(contentTypeId: string): ContentfulRequest {
    this.cachedFieldName = 'content.contentTypes.' + contentTypeId;
    return super.getContentType(contentTypeId);
  }

  public getEntry(entryId: string): ContentfulRequest {
    this.cachedEntryId = entryId;
    return super.getEntry(entryId);
  }

  public getEntries(): ContentfulRequest {
    this.cachedFieldName = 'content.entries';
    return super.getEntries();
  }
}
