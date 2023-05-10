import { Component } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

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
  model: any;
  predictionValue: number;

  constructor() {
  }

  async ngOnInit() {
    await this.loadModel();
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
    console.log('onChangeWeight', event);
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

  //load tensorflow model
  async loadModel() {
    this.model = await tf.loadGraphModel('assets/model.json');
  }

  //predict
  predict() {
    const example = tf.tensor2d([this.age, 	this.heightInInches,	this.weightInPounds, this.genderInt], [1,4]);  // for example

    const prediction = this.model.predict(example);
    const value = prediction.dataSync()[0];
    this.predictionValue = value;
  }
}
