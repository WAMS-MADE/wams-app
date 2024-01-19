import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { PredictionComponent } from './prediction/prediction.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    PredictionComponent,
    ImageDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatRadioModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
