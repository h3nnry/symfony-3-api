import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { XLargeModule } from '../x-large';
import { TodoComponent } from './todo';
import { TodoListComponent } from './todo-list';
import { TodosComponent } from './todos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    XLargeModule
  ],
  exports: [
    TodosComponent
  ],
  declarations: [
    TodosComponent,
    TodoListComponent,
    TodoComponent
  ]
})
export class TodosModule { }
