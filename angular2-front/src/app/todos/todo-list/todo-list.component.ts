import {
  Component, Input,
  Output, EventEmitter
} from '@angular/core';
import { Todo } from '../todo/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: [ './todo-list.component.scss' ]
})
export class TodoListComponent {
  @Input() public items: Todo[];
  @Output() public onUpdate = new EventEmitter<Todo[]>();

  public edit(item: { id: number, todo: Todo }): void {
    this.items[item.id] = item.todo;
    this.onUpdate.emit(this.items);
  }

  public delete(i: number): void {
    this.items.splice(i, 1);
    this.onUpdate.emit(this.items);
  }
}
