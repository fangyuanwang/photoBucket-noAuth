import { PhotoBucketNoAuthPage } from './app.po';

describe('photo-bucket-no-auth App', () => {
  let page: PhotoBucketNoAuthPage;

  beforeEach(() => {
    page = new PhotoBucketNoAuthPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
