import { NgGlaucomaPage } from './app.po';

describe('ng-glaucoma App', () => {
  let page: NgGlaucomaPage;

  beforeEach(() => {
    page = new NgGlaucomaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
