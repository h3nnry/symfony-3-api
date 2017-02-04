import { element, by } from 'protractor';

export class HomePage {
  public getH1() {
    return element(by.css('h1')).getText();
  };

  public getTodosLengthText() {
    return element(by.css('.text-todos-length')).getText().then((res) => { return res.trim(); });
  }

  public getTodos() {
    return element.all(by.css('app-todo'));
  }

  public getTitleInput() {
    return element(by.css('.form-control-title'));
  }

  public getAddButton() {
    return element(by.css('.btn-add'));
  }

  public getAddImportantButton() {
    return element(by.css('.btn-add-important'));
  }

  public getDoneInputs() {
    return element.all(by.css('.input-done'));
  }

  public getDeleteButtons() {
    return element.all(by.css('.btn-delete'));
  }
}
