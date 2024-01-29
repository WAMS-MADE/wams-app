import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionDialogComponent } from './prediction-dialog.component';

describe('PredictionDialogComponent', () => {
  let component: PredictionDialogComponent;
  let fixture: ComponentFixture<PredictionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PredictionDialogComponent]
    });
    fixture = TestBed.createComponent(PredictionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
