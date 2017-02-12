import { ActivatedRoute, Data } from '@angular/router';
import { Component } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';

// Load the implementations that should be tested
import { ProductListComponent } from './product-list.component';

describe('Product-List', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      // provide a better mock
      {
        provide: ActivatedRoute,
        useValue: {
          data: {
            subscribe: (fn: (value: Data) => void) => fn({
              yourData: 'yolo'
            })
          }
        }
      },
      ProductListComponent
    ]
  }));

  it('should log ngOnInit', inject([ProductListComponent], (productList: ProductListComponent) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    productList.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
