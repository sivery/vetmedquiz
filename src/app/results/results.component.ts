import { Component, OnInit } from '@angular/core';
import {QuestionForm, QuestionSet} from "@app/data/questions";
import {ConfirmationService} from "primeng";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  public questionForms: QuestionForm[];

  public startTime: Date;
  public endTime: Date;

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.questionForms = JSON.parse(sessionStorage.getItem('questionForms'));
    this.startTime = new Date(JSON.parse(sessionStorage.getItem('startTime')));
    this.endTime = new Date(JSON.parse(sessionStorage.getItem('endTime')));

    if(!this.questionForms) {
      this.router.navigate(['/']);
    }
  }

  public getScore() {
    return this.questionForms.filter(questionForm => questionForm.correct).length;
  }

  public getTime() {
    let diffTime =  this.endTime.getTime() - this.startTime.getTime();
    let hours = Math.floor(diffTime / (1000 * 60 * 60));
    let minutes = Math.floor(diffTime / (1000 * 60)) - hours * 60;
    let seconds = Math.floor(diffTime / (1000)) - hours * 60 * 60 - minutes * 60;
    return hours + ':' + minutes + ':' + seconds;
  }

  public goToResponses() {
    this.router.navigate(['/reponses']);
  }

}
