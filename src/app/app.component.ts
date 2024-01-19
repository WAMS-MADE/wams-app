import { Component } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { OnnxModelService } from './services/onnx-model.service';
import { OnnxConfModelService } from './services/onnx-conf-model.service';
import { ModelPrediction, ModelType } from './services/model_mapping';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'wams-ml-app';
  heightInInches = 68;
  heightInFeetAndInches = '5\'8"';
  weightInPounds = 170;
  age = 30;
  gender = 'male';
  genderInt = 1;
  hipModel: any;
  hipPredictionValue: number;

  upperLegModel: any;
  upperLegPredictionValue: number;

  lowerLegModel: any;
  lowerLegPredictionValue: number;

  modelButtons = [
    { name: 'Linear Regression', ID: 'reg' },
    // {"name": "LightGBM", ID: "lgbm"},
    { name: 'LightGBM Conf', ID: 'conf' },
  ];

  targetPredictions: ModelPrediction[] = [];

  targetMeasures = [
    'hipbreadthsitting',
    'bideltoidbreadth',
    'chestbreadth',
    'sittingheight',
    'buttockpopliteallength',
    'thighclearance',
    'tibialheight',
    'buttockkneelength',
    'elbowrestheight',
    'kneeheightsitting',
  ];

  chosenModel = 'LightGBM Conf';
  lower10Quantile: number;
  upper90Quantile: number;
  confidenceSpan: number;

  constructor(
    private onnxModel: OnnxModelService,
    private onnxConfModel: OnnxConfModelService,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    await this.loadHipModel();
    await this.loadUpperLegModel();
    await this.loadLowerLegModel();
    this.predict();
  }

  onChangeHeight(event: any) {
    this.heightInInches = +event.target.value;
    this.heightInFeetAndInches = this.convertInchesToFeetAndInches(
      this.heightInInches
    );
    this.predict();
  }

  convertInchesToFeetAndInches(inches: number) {
    const feet = Math.floor(inches / 12);
    const remainingInches = inches % 12;
    return `${feet}'${remainingInches}"`;
  }

  onChangeWeight(event: any) {
    this.weightInPounds = +event.target.value;
    this.predict();
  }

  onChangeAge(event: any) {
    this.age = +event.target.value;
    this.predict();
  }

  onChangeGender(event: any) {
    this.gender = event.target.value;
    if (this.gender === 'male') {
      this.genderInt = 1;
    } else if (this.gender === 'female') {
      this.genderInt = 2;
    }
    this.predict();
  }

  onChangeModel(event: any) {
    this.chosenModel = event.value;
    if (this.chosenModel === 'Linear Regression') {
      this.upper90Quantile = null;
      this.lower10Quantile = null;
      this.confidenceSpan = null;
    }
    this.predict();
  }

  //load tensorflow model
  async loadHipModel() {
    this.hipModel = await tf.loadGraphModel('assets/hip_model/model.json');
  }
  async loadUpperLegModel() {
    this.upperLegModel = await tf.loadGraphModel(
      'assets/upper_leg_model/model.json'
    );
  }

  async loadLowerLegModel() {
    this.lowerLegModel = await tf.loadGraphModel(
      'assets/lower_leg_model/model.json'
    );
  }

  formatLabel(inches: number): string {
    var feet = Math.floor(inches / 12);
    var remainingInches = inches % 12;
    return `${inches}`;
  }

  //predict
  async predict() {
    const example = tf.tensor2d(
      [this.age, this.heightInInches, this.weightInPounds, this.genderInt],
      [1, 4]
    ); // for example
    if (this.chosenModel === 'Linear Regression') {
      const hipPrediction = this.hipModel.predict(example);
      this.hipPredictionValue = this.roundToNearestQuarterInch(
        hipPrediction.dataSync()[0]
      );

      const upperLegPrediction = this.upperLegModel.predict(example);
      this.upperLegPredictionValue = this.roundToNearestQuarterInch(
        upperLegPrediction.dataSync()[0]
      );

      const lowerLegPrediction = this.lowerLegModel.predict(example);
      this.lowerLegPredictionValue = this.roundToNearestQuarterInch(
        lowerLegPrediction.dataSync()[0]
      );
    } else if (this.chosenModel === 'LightGBM') {
      await this.onnxModel
        .predict(
          this.age,
          this.heightInInches,
          this.weightInPounds,
          this.genderInt
        )
        .then((predictions) => {
          this.hipPredictionValue = this.roundToNearestQuarterInch(
            predictions as number
          );
          this.upperLegPredictionValue = null;
          this.lowerLegPredictionValue = null;
        });
    } else if (this.chosenModel === 'LightGBM Conf') {
      this.targetPredictions = [];
      for (const target of this.targetMeasures) {
        // console.log(target);
        const prediction = await this.predictWithConfidence(target);
        this.targetPredictions.push(prediction);
      }
    }
  }

  async predictWithConfidence(targetMeasure: string) {
    let urls: ModelType = null;
    let prediction: ModelPrediction = new ModelPrediction();
    prediction.target = targetMeasure;
    // console.log(targetMeasure);

    await this.onnxConfModel
      .getConfidenceModelURLs(targetMeasure)
      .then((result) => {
        urls = result;
      });
    for (const [key, value] of Object.entries(urls)) {
      // console.log(`${key}: ${value}`);
      await this.onnxConfModel
        .predictConfidence(
          value,
          this.age,
          this.heightInInches,
          this.weightInPounds,
          this.genderInt
        )
        .then((result) => {
          switch (key) {
            case '0.1':
              prediction['0.1'] = result as number;
              break;
            case '0.5':
              prediction['0.5'] = result as number;
              break;
            case '0.9':
              prediction['0.9'] = result as number;
              break;
          }
          prediction.confidenceSpan = prediction['0.9'] - prediction['0.1'];
        });
    }
    return prediction;
  }

  //round to nearest quarter inch
  roundToNearestQuarterInch(inches: number) {
    var quarterInch = 1 / 4; // Represents a quarter inch
    var roundedInches = Math.round(inches * 4) / 4; // Round to nearest quarter inch
    return roundedInches;
  }

  onClickPrediction(target: string) {
    // console.log(target);
    //show modal with image
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      width: '500px',
      height: '665px',
      data: {name: target, image: `assets/images/${target}.png`},
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log(`Dialog result: ${result}`);
    });
  }
}
