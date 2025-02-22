import { TestBed } from '@angular/core/testing';

import { SidekiqService } from './sidekiq.service';

describe('SidekiqService', () => {
  let service: SidekiqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidekiqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
