import { Component, OnInit } from '@angular/core';
import {QuestionSet} from "@app/data/questions";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-pretext',
  templateUrl: './pretext.component.html',
  styleUrls: ['./pretext.component.scss']
})
export class PretextComponent implements OnInit {

  public selectedQuestionSets: QuestionSet[];

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    let selectedQuestionSets: QuestionSet[] = JSON.parse(sessionStorage.getItem('selectedQuestionSets'));
    if(selectedQuestionSets) {
      this.selectedQuestionSets = selectedQuestionSets;
    }
    else {
      this.router.navigate(['/']);
    }
  }

  public startQuiz() {
    this.router.navigate(['/quiz']);
  }

}
