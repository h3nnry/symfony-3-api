import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store/store.service';
import { Todo } from './todo/todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: [ './todos.component.scss' ]
})
export class TodosComponent implements OnInit {
  public items: Todo[] = [];
  public title: string = '';
  public important: boolean = false;
  public storeName: string = 'todos';

  constructor(public store: StoreService) { }

  public ngOnInit(): void {
    this.items = this.store.get(this.storeName);
  }

  public get todos(): Todo[] {
    return this.items || [];
  }

  public set todos(value) {
    this.items = value;
    this.store.set(this.storeName, value);
  }

  public add(todo: Todo): void {
    let item: Todo = todo;
    let items = this.todos;
    items.push(item);
    this.title = '';
    this.todos = items;
  }

  public save(todos: Todo[]): void {
    this.todos = todos;
  }

}
