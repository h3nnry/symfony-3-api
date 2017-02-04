import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

const ROUTES: Routes = [
  { path: '', loadChildren: './+home/home.module#HomeModule' },
  { path: 'about', loadChildren: './+about/about.module#AboutModule' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: PreloadAllModules })
  ]
})
export class AppRoutingModule { }
