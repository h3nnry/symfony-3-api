import { inject, TestBed } from '@angular/core/testing';

// Load the implementations that should be tested
import { TodosComponent } from './todos.component';
import { Todo } from './todo/todo.model';
import { StoreService } from '../store/store.service';

let todos: Todo[];
let spyStoreGet;

describe('TodosComponent', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      StoreService,
      TodosComponent
    ]
  }));

  beforeEach(inject([ TodosComponent ], (comp: TodosComponent) => {
    todos = [
      { title: 'task1', done: true },
      { title: 'task2', done: false },
      { title: 'task3', done: false }
    ];
    spyStoreGet = spyOn(comp.store, 'get').and.callFake(() => {
      return todos;
    });
    comp.ngOnInit();
  }));

  it('should have default data', inject([ TodosComponent ], (comp: TodosComponent) => {
    expect(comp.todos).toEqual(todos);
    expect(comp.title).toEqual('');
  }));

  it('should get todos from store', inject([ TodosComponent ], (comp: TodosComponent) => {
    spyStoreGet.calls.reset();

    comp.ngOnInit();
    expect(spyStoreGet).toHaveBeenCalledWith(comp.storeName);
    expect(comp.items).toEqual(todos);
  }));

  it('should always return an array', inject([ TodosComponent ], (comp: TodosComponent) => {
    comp.items = null;
    expect(comp.items).toBeNull();
    expect(comp.todos).toEqual([]);
  }));

  it('should add item to todos list', inject([ TodosComponent ], (comp: TodosComponent) => {
    expect(comp.todos.length).toEqual(3);
    let todo: Todo = { title: 'task 4', important: false, done: false };

    comp.add(todo);
    expect(comp.todos.length).toEqual(4);
    expect(comp.todos[3]).toEqual(todo);
  }));

  it('should save todos', inject([ TodosComponent ], (comp: TodosComponent) => {
    let todoList = [
      { title: 'task1', done: false },
      { title: 'task2', done: true }
    ];

    comp.save(todoList);
    expect(comp.todos.length).toEqual(2);
    expect(comp.todos[0]).toEqual(<Todo> { title: 'task1', done: false });
  }));

});
