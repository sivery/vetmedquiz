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
  DeferModule, InputNumberModule, InputTextModule,
  MultiSelectModule,
  PanelModule,
  RadioButtonModule, TableModule
} from "primeng";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { PretextFilterPipe } from './pretext/pretext-filter.pipe';
import { PretextComponent } from './pretext/pretext.component';
import { FormComponent } from './form/form.component';
import { ResultsComponent } from './results/results.component';
import { SourcesComponent } from './sources/sources.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    PretextFilterPipe,
    PretextComponent,
    FormComponent,
    ResultsComponent,
    SourcesComponent,
    ContactComponent
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
    InputTextModule,
    InputNumberModule,
    TableModule
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
