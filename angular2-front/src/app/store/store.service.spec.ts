import { inject, TestBed } from '@angular/core/testing';
import {
  BaseRequestOptions, ConnectionBackend,
  Http
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { StoreService } from './store.service';

describe('StoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BaseRequestOptions,
      MockBackend,
      {
        provide: Http,
        useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
          return new Http(backend, defaultOptions);
        },
        deps: [MockBackend, BaseRequestOptions]
      },
      StoreService
    ]
  }));

  beforeEach(() => {
    localStorage.clear();
  });

  it('should have store name', inject([ StoreService ], (store: StoreService) => {
    expect(store.storeName).toEqual('appData');
  }));

  it('should get data from storage', inject([ StoreService ], (store: StoreService) => {
    let spy = spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify({ foo: 'bar' });
    });
    let result = store.get('foo');

    expect(spy).toHaveBeenCalledWith(store.storeName);
    expect(result).toEqual('bar');
  }));

  it('should return undefined', inject([ StoreService ], (store: StoreService) => {
    let spy = spyOn(localStorage, 'getItem');
    spy.and.callFake(() => {
      return undefined;
    });
    let result = store.get('foo');
    expect(result).toBeUndefined();
  }));

  it('should set data to storage', inject([ StoreService ], (store: StoreService) => {
    let spySet = spyOn(localStorage, 'setItem');
    let spyGet = spyOn(localStorage, 'getItem');
    spyGet.and.callFake(() => {
      return JSON.stringify({ foo: 'bar' });
    });
    let result = JSON.stringify({ foo: 'bar', foo2: 'bar2' });
    store.set('foo2', 'bar2');
    expect(spySet).toHaveBeenCalledWith(store.storeName, result);
  }));

  it('should delete data from storage', inject([ StoreService ], (store: StoreService) => {
    let spySet = spyOn(localStorage, 'setItem');
    let spyGet = spyOn(localStorage, 'getItem');
    spyGet.and.callFake(() => {
      return JSON.stringify({ foo: 'bar', foo2: 'bar2' });
    });
    let result = JSON.stringify({ foo2: 'bar2' });
    store.delete('foo');
    expect(spySet).toHaveBeenCalledWith(store.storeName, result);
  }));

  it('should delete nothing', inject([ StoreService ], (store: StoreService) => {
    let spySet = spyOn(localStorage, 'setItem');
    let spyGet = spyOn(localStorage, 'getItem');
    spyGet.and.callFake(() => {
      return JSON.stringify({ foo: 'bar', foo2: 'bar2' });
    });
    let result = JSON.stringify({ foo: 'bar', foo2: 'bar2' });
    store.delete('foo3');
    expect(spySet).toHaveBeenCalledWith(store.storeName, result);
  }));

});
