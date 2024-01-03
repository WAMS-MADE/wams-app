import { Component } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { OnnxModelService } from './services/onnx-model.service';
import { OnnxConfModelService } from './services/onnx-conf-model.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wams-ml-app';
  heightInInches= 68;
  heightInFeetAndInches= '5\'8"';
  weightInPounds= 170;
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
      {"name": "Linear Regression", ID: "reg"},
      // {"name": "LightGBM", ID: "lgbm"},
      {"name": "LightGBM Conf", ID: "conf"}
    ];

  chosenModel = this.modelButtons[0].name;
  lower10Quantile: number;
  upper90Quantile: number;
  confidenceSpan: number;


  constructor(private onnxModel: OnnxModelService, private onnxConfModel: OnnxConfModelService) {
  }

  async ngOnInit() {
    await this.loadHipModel();
    await this.loadUpperLegModel();
    await this.loadLowerLegModel();
    this.predict();

  }

  onChangeHeight(event: any) {
    this.heightInInches = +event.target.value;
    this.heightInFeetAndInches = this.convertInchesToFeetAndInches(this.heightInInches);
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
    } else if (this.gender === 'female')  {
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
    this.upperLegModel = await tf.loadGraphModel('assets/upper_leg_model/model.json');
  }

  async loadLowerLegModel() {
    this.lowerLegModel = await tf.loadGraphModel('assets/lower_leg_model/model.json');
  }


  formatLabel(inches: number): string {
    var feet = Math.floor(inches / 12);
    var remainingInches = inches % 12;
    // return `${feet} ft ${remainingInches} in` ;
    return `${inches}`
  }

  //predict
  async predict() {
    const example = tf.tensor2d([this.age, 	this.heightInInches,	this.weightInPounds, this.genderInt], [1,4]);  // for example
    if (this.chosenModel === 'Linear Regression') {
      const hipPrediction = this.hipModel.predict(example);
      this.hipPredictionValue = this.roundToNearestQuarterInch(hipPrediction.dataSync()[0]);


      const upperLegPrediction = this.upperLegModel.predict(example);
      this.upperLegPredictionValue = this.roundToNearestQuarterInch(upperLegPrediction.dataSync()[0]);

      const lowerLegPrediction = this.lowerLegModel.predict(example);
      this.lowerLegPredictionValue = this.roundToNearestQuarterInch(lowerLegPrediction.dataSync()[0]);
    }
    else if (this.chosenModel === 'LightGBM') {
      await this.onnxModel.predict(this.age, this.heightInInches,	this.weightInPounds, this.genderInt).then
      (predictions => {
        this.hipPredictionValue = this.roundToNearestQuarterInch(predictions as number);
        this.upperLegPredictionValue = null;
        this.lowerLegPredictionValue = null;
      });
    }

    else if (this.chosenModel === 'LightGBM Conf') {
      await this.onnxConfModel.predictBase(this.age, this.heightInInches,	this.weightInPounds, this.genderInt).then
      (predictions => {
        this.hipPredictionValue = this.roundToNearestQuarterInch(predictions as number);
        this.upperLegPredictionValue = null;
        this.lowerLegPredictionValue = null;
      });
      await this.onnxConfModel.predict10PercentQuantile(this.age, this.heightInInches,	this.weightInPounds, this.genderInt).then
      (predictions => {
        this.lower10Quantile = predictions as number;
      });
      await this.onnxConfModel.predict90PercentQuantile(this.age, this.heightInInches,	this.weightInPounds, this.genderInt).then
      (predictions => {
        this.upper90Quantile = predictions as number;
      });
      this.confidenceSpan = this.upper90Quantile - this.lower10Quantile;
    }



  }

  //round to nearest quarter inch
  roundToNearestQuarterInch(inches: number) {
    var quarterInch = 1 / 4; // Represents a quarter inch
    var roundedInches = Math.round(inches * 4) / 4; // Round to nearest quarter inch
    return roundedInches;
  }
}
