import { TestBed } from '@angular/core/testing';

import { OnnxModelService } from './onnx-model.service';

describe('OnnxModelService', () => {
  let service: OnnxModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnnxModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
