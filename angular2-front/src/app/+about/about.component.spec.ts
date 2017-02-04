import { inject, TestBed } from '@angular/core/testing';
import {
  HttpModule, Http,
  BaseRequestOptions,
  ResponseOptions, Response,
  ConnectionBackend
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

// Load the implementations that should be tested
import { AboutComponent } from './about.component';
import { AboutResolver } from './about-resolve.service';

let resolveData = {
  about: {
    name: 'Angular 2 Start',
    author: 'SOON_',
    url: 'http://thisissoon.com'
  }
};
let mockActivatedRoute = { data: Observable.of(resolveData) };

describe('AboutComponent', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: ActivatedRoute, useValue: mockActivatedRoute },
      AboutComponent
    ]}));

  it('should exist', inject([ AboutComponent ], (about: AboutComponent) => {
    expect(about).toBeTruthy();
  }));

  it('should have resolved data in component', inject([ AboutComponent ],
  (about: AboutComponent) => {
    about.ngOnInit();
    expect(about.about.name).toEqual('Angular 2 Start');
    expect(about.about.author).toEqual('SOON_');
    expect(about.about.url).toEqual('http://thisissoon.com');
  }));

});

describe('AboutResolver', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpModule ],
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
      AboutResolver
    ]}));

  it('should resolve data', inject([ AboutResolver, MockBackend, Http ],
  (about: AboutResolver, backend: MockBackend) => {
    backend.connections.subscribe((connection: MockConnection) => {
      let mockResponseBody = resolveData;
      let response = new ResponseOptions({ body: JSON.stringify(mockResponseBody) });
      connection.mockRespond(new Response(response));
    });
    let result;
    about.resolve().subscribe((res) => result = res);
    expect(result).toEqual(resolveData);
  }));

  it('should NOT resolve data', inject([ AboutResolver, MockBackend, Http ],
  (about: AboutResolver, backend: MockBackend) => {
    let error;
    backend.connections.subscribe((connection: MockConnection) => {
      let err: Error = new Error('something went wrong');
      connection.mockError(err);
    });
    about.resolve().subscribe(
      undefined,
      (err: Error) => error = err.message
    );
    expect(error).toEqual('something went wrong');
  }));

});
