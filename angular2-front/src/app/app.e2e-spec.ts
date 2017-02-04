import { browser, element, by } from 'protractor';

describe('App', () => {

  beforeEach(() => {
    browser.get('/');
  });

  it('should have a title', () => {
    let subject = browser.getTitle();
    let result = 'Angular 2 Start';
    expect(subject).toEqual(result);
  });

  it('should have <app-home>', () => {
    let subject = element(by.css('app-root app-home')).isPresent();
    let result = true;
    expect(subject).toEqual(result);
  });

});
