import { Component, Input, SimpleChanges } from '@angular/core';
import { ModelPrediction } from '../services/model_mapping';
import { MatDialog } from '@angular/material/dialog';
import { PredictionComponent } from '../prediction/prediction.component';
import { PredictionDialogComponent } from '../prediction-dialog/prediction-dialog.component';

@Component({
  selector: 'app-body-image',
  templateUrl: './body-image.component.html',
  styleUrls: ['./body-image.component.css']
})
export class BodyImageComponent {
  @Input() data: ModelPrediction[] = null;

  hipsData: ModelPrediction = null;
  shoulderData: ModelPrediction = null;
  chestData: ModelPrediction = null;
  sittingHeightData: ModelPrediction = null;
  shoulderHeightData: ModelPrediction = null;
  upperLegData: ModelPrediction = null;
  lowerLegData: ModelPrediction = null;


  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.changeData();
  }

  changeData(): void {
    if (this.data !== null) {
      this.hipsData = this.data.find((d) => d.target === 'hipbreadthsitting');
      this.shoulderData = this.data.find((d) => d.target === 'bideltoidbreadth');
      this.chestData = this.data.find((d) => d.target === 'chestbreadth');
      this.sittingHeightData = this.data.find((d) => d.target === 'sittingheight');
      this.upperLegData = this.data.find((d) => d.target === 'buttockpopliteallength');
      this.lowerLegData = this.data.find((d) => d.target === 'poplitealheight');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.changeData();
  }

  openConfidenceModal(data: ModelPrediction) {
    // console.log(target);
    //show modal with image
    const dialogRef = this.dialog.open(PredictionDialogComponent, {
      width: '500px',
      height: '150px',
      data: {
        predictionTitle: data.target,
        lower10Quantile: data['0.1'],
        upper90Quantile: data['0.9'],
        confidenceSpan: data.confidenceSpan,
        predictionValue: data['0.5'],
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log(`Dialog result: ${result}`);
    });
  }

}
