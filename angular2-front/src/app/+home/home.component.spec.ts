import { inject, TestBed } from '@angular/core/testing';

// Load the implementations that should be tested
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HomeComponent
    ]
  }));

  it('should exist', inject([ HomeComponent ], (home: HomeComponent) => {
    expect(home).toBeTruthy();
  }));

});
