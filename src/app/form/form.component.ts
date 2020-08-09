import { Component, OnInit } from '@angular/core';
import {SelectItem} from "primeng";
import {Constants} from "@app/data/constants";
import {QuestionForm, QuestionSet} from "@app/data/questions";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {QuizUtils} from "@app/utils/quiz-utils";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public nbrQuestions: number = 0;

  public random: boolean = true;

  public showPretextSection: boolean = false;

  public topics: SelectItem[] = [
    {label: Constants.ENGLISH, value: Constants.ENGLISH},
    {label: Constants.BIOLOGY, value: Constants.BIOLOGY},
    {label: Constants.CHEMISTRY, value: Constants.CHEMISTRY},
    {label: Constants.COMMUNICATION, value: Constants.COMMUNICATION},
    {label: Constants.EMPATHY, value: Constants.EMPATHY},
    {label: Constants.ETHICS, value: Constants.ETHICS},
    {label: Constants.FRENCH, value: Constants.FRENCH},
    {label: Constants.MATHEMATICS, value: Constants.MATHEMATICS},
    {label: Constants.PHYSIQUE, value: Constants.PHYSIQUE},
    {label: Constants.REASONING, value: Constants.REASONING},
  ];

  public selectedTopics: string[];

  public sessions: SelectItem[] = [
    {label: Constants.GFORM2018, value: Constants.GFORM2018},
    {label: Constants.GFORM2017, value: Constants.GFORM2017},
    {label: 'Septembre 2017 (' +  Constants.SEP2017 + ')' , value: Constants.SEP2017},
    {label: 'Juillet 2017 (' +  Constants.JUL2017 + ')' , value: Constants.JUL2017},
    {label: 'Septembre 2016 (' +  Constants.SEP2016 + ')' , value: Constants.SEP2016},
    {label: 'Juillet 2016 (' +  Constants.JUL2016 + ')' , value: Constants.JUL2016},
    {label: 'Septembre 2015 (' +  Constants.SEP2015 + ')' , value: Constants.SEP2015},
    {label: 'Juillet 2015 (' +  Constants.JUL2015 + ')' , value: Constants.JUL2015},
    {label: 'Septembre 2014 (' +  Constants.SEP2014 + ')' , value: Constants.SEP2014},
    {label: 'Juillet 2014 (' +  Constants.JUL2014 + ')' , value: Constants.JUL2014},
    {label: 'Septembre 2013 (' +  Constants.SEP2013 + ')' , value: Constants.SEP2013},
    {label: 'Juillet 2013 (' +  Constants.JUL2013 + ')' , value: Constants.JUL2013},
    {label: 'Questions supplémentaires (' +  Constants.EXTRA + ')' , value: Constants.EXTRA},
  ];

  public selectedSessions: string[];

  private questionSets: QuestionSet[];
  public selectedQuestionSets: QuestionSet[];

  public maxNbrQuestion: number;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router  ) { }

  ngOnInit(): void {
    let self = this;

    sessionStorage.clear();

    this.http.get('questions.json').subscribe((qs: QuestionSet[]) => {
      self.questionSets = qs;

      self.selectedQuestionSets = [];
      self.selectedQuestionSets = self.selectedQuestionSets.concat(self.questionSets);
      self.countQuestions();
    });
  }

  public selectQuestionSets() {
    let self = this;
    let selectedQuestionSets: QuestionSet[] = [];
    selectedQuestionSets = selectedQuestionSets.concat(self.questionSets);
    if(this.selectedTopics && this.selectedTopics.length > 0) {
      selectedQuestionSets = selectedQuestionSets.filter(qs => {
        return self.selectedTopics.indexOf(qs.topic) > -1;
      });
    }
    if(this.selectedSessions && this.selectedSessions.length > 0) {
      selectedQuestionSets = selectedQuestionSets.filter(qs => {
        return self.selectedSessions.indexOf(qs.session) > -1;
      });
    }

    self.selectedQuestionSets = selectedQuestionSets;
    this.countQuestions();
  }

  private countQuestions() {
    let nbrQuestions = 0;
    this.selectedQuestionSets.forEach(qs => {
      nbrQuestions += qs.questions.length;
    })
    this.nbrQuestions = nbrQuestions;
    this.showPretextSection = this.selectedQuestionSets.findIndex(qs => {return qs.pretext}) > -1;
  }

  public startQuiz() {
    sessionStorage.setItem('selectedQuestionSets', JSON.stringify(this.selectedQuestionSets));
    sessionStorage.setItem('random', JSON.stringify(this.random));
    if(this.maxNbrQuestion) {
      sessionStorage.setItem('maxNbrQuestion', JSON.stringify(this.maxNbrQuestion));
    }

    if(this.showPretextSection) {
      this.router.navigate(['/preambule']);
    }
    else {
      this.router.navigate(['/quiz']);
    }
  }

}
