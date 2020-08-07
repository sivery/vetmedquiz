import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CoreModule} from "./core";
import { QuizComponent } from './quiz/quiz.component';
import {
  AccordionModule,
  ButtonModule, ConfirmationService,
  ConfirmDialogModule,
  DeferModule, InputNumberModule,
  MultiSelectModule,
  PanelModule,
  RadioButtonModule
} from "primeng";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { PretextFilterPipe } from './quiz/pretext-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    PretextFilterPipe
  ],
  imports: [
    FormsModule,
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    ButtonModule,
    MultiSelectModule,
    AccordionModule,
    PanelModule,
    BrowserAnimationsModule,
    RadioButtonModule,
    DeferModule,
    ConfirmDialogModule,
    InputNumberModule
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
