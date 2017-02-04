import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about.component';
import { AboutResolver } from './about-resolve.service';

const ROUTES: Routes = [
  {
    path: '',
    component: AboutComponent,
    pathMatch: 'full',
    resolve: {
      about: AboutResolver
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ]
})
export class AboutRoutingModule {}
