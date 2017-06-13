import { TestBed, inject } from '@angular/core/testing';

import { PreferenceService } from './preference.service';

describe('PreferenceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreferenceService]
    });
  });

  it('should be created', inject([PreferenceService], (service: PreferenceService) => {
    expect(service).toBeTruthy();
  }));
});
