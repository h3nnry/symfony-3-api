import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '../store';
import { TodosModule } from '../todos';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

console.log('`Home` bundle loaded asynchronously');

@NgModule({
  imports: [
    CommonModule,
    StoreModule,
    TodosModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
