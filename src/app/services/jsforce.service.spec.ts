import { TestBed, inject } from '@angular/core/testing';

import { JsforceService } from './jsforce.service';

describe('JsforceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JsforceService]
    });
  });

  it('should be created', inject([JsforceService], (service: JsforceService) => {
    expect(service).toBeTruthy();
  }));
});
