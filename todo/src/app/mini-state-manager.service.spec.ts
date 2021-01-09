import { TestBed } from '@angular/core/testing';

import { MiniStateManagerService } from './mini-state-manager.service';

describe('MiniStateManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MiniStateManagerService = TestBed.get(MiniStateManagerService);
    expect(service).toBeTruthy();
  });
});
