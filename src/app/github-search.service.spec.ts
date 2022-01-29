import { TestBed } from '@angular/core/testing';

import { GithubUserService } from './github-user.service';

describe('GithubSearchService', () => {
  let service: GithubUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GithubUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
