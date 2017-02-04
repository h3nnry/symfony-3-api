import { inject, TestBed } from '@angular/core/testing';

// Load the implementations that should be tested
import { TodoListComponent } from './todo-list.component';
import { Todo } from '../todo/todo.model';

let todos: Todo[];

describe('TodoListComponent', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TodoListComponent
    ]
  }));

  beforeEach(inject([ TodoListComponent ], (comp: TodoListComponent) => {
    todos = [
      { title: 'task1', done: true },
      { title: 'task2', done: false },
      { title: 'task3', done: false }
    ];
    comp.items = todos;
  }));

  it('should have default data',
  inject([ TodoListComponent ], (comp: TodoListComponent) => {
    expect(comp.items).toEqual(todos);
  }));

  it('should edit item in todos list',
  inject([ TodoListComponent ], (comp: TodoListComponent) => {

    let todo: Todo = { title: 'Task 1 Edited', done: false };
    expect(comp.items[0]).not.toEqual(todo);

    comp.edit({id: 0, todo});
    expect(comp.items.length).toEqual(3);
    expect(comp.items[0]).toEqual(todo);
  }));

  it('should delete item in todos list',
  inject([ TodoListComponent ], (comp: TodoListComponent) => {

    let todo = todos[0];

    expect(comp.items.length).toEqual(3);
    expect(comp.items[0]).toEqual(todo);

    comp.delete(0);
    expect(comp.items.length).toEqual(2);
    expect(comp.items[0]).not.toEqual(todo);
  }));

});
