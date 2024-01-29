import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})
export class PredictionComponent {
  @Input() predictionTitle: string;
  @Input() predictionValue: number;
  @Input() lower10Quantile: number;
  @Input() upper90Quantile: number;
  @Input() confidenceSpan: number;

}
