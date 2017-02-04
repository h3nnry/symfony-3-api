import { inject, TestBed } from '@angular/core/testing';

// Load the implementations that should be tested
import { TodoComponent } from './todo.component';

describe('TodoComponent', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TodoComponent
    ]
  }));

  it('should emit "edit" event', inject([ TodoComponent ], (comp: TodoComponent) => {
    let spy = spyOn(comp.onEdit, 'emit');
    comp.edit();
    expect(spy).toHaveBeenCalledWith({ id: comp.id, todo: comp.item });
  }));

  it('should emit "delete" event', inject([ TodoComponent ], (comp: TodoComponent) => {
    let spy = spyOn(comp.onDelete, 'emit');
    comp.delete();
    expect(spy).toHaveBeenCalledWith(comp.id);
  }));

});
