import { NgModule } from '@angular/core';

import { StoreService } from './store.service';

const STORE_PROVIDERS = [
  StoreService
];

@NgModule({
  providers: [
    ...STORE_PROVIDERS
  ]
})
export class StoreModule { }
