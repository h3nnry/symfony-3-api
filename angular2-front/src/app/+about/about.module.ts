import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { AboutComponent } from './about.component';
import { ABOUT_RESOLVER_PROVIDERS } from './about-resolve.service';
import { AboutRoutingModule } from './about-routing.module';

const ABOUT_PROVIDERS = [
  ...ABOUT_RESOLVER_PROVIDERS,
];

console.log('`About` bundle loaded asynchronously');

@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    HttpModule,
    CommonModule,
    AboutRoutingModule
  ],
  providers: [
    ...ABOUT_PROVIDERS
  ]
})
export class AboutModule { }
