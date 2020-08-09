import {Component, OnInit} from '@angular/core';
import {ConfirmationService, SelectItem} from "primeng";
import {QuestionForm, QuestionSet} from "@app/data/questions";
import {QuizUtils} from "@app/utils/quiz-utils";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-quizz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  providers: [ConfirmationService]
})
export class QuizComponent implements OnInit {

  public questionForms: QuestionForm[];
  public questionFormIndex: number;

  public responses: boolean;

  get questionForm(): QuestionForm {
    return this.questionForms[this.questionFormIndex];
  }

  constructor(public confirmationService: ConfirmationService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    let self = this;

    this.route.data.subscribe(data => {
      self.responses = data.responses;

      let questionFormIndex = JSON.parse(sessionStorage.getItem('questionFormIndex'));

      this.questionFormIndex = questionFormIndex ? questionFormIndex : 0;

      let questionForms: [] = JSON.parse(sessionStorage.getItem('questionForms'));

      if(self.responses) {

        if(!questionForms) {
          self.router.navigate(['/']);
        }

        self.questionForms = questionForms.map(questionForm => {
          return new QuestionForm(questionForm);
        })
      }
      else {
        if(questionForms) {
          self.questionForms = questionForms.map(questionForm => {
            return new QuestionForm(questionForm);
          })
        }
        else {
          let selectedQuestionSets: QuestionSet[] = JSON.parse(sessionStorage.getItem('selectedQuestionSets'));
          let random: boolean = JSON.parse(sessionStorage.getItem('random'));
          let maxNbrQuestion: number = JSON.parse(sessionStorage.getItem('maxNbrQuestion'));

          if(!selectedQuestionSets) {
            self.router.navigate(['/']);
          }

          this.questionForms = QuizUtils.getQuestionForms(selectedQuestionSets, random, maxNbrQuestion);
          this.questionFormIndex = 0;
          this.saveQuestionForms();
        }
        sessionStorage.setItem('startTime', JSON.stringify(new Date().getTime()));
      }
    });

    this.saveQuestionFormIndex();
  }

  public hasPreviousQuestion() {
    return this.questionFormIndex > 0;
  }

  public hasNextQuestion() {
    return this.questionFormIndex < this.questionForms.length - 1;
  }

  public previousQuestion() {
    if(this.hasPreviousQuestion()) {
      this.questionFormIndex --;
      this.saveQuestionFormIndex();
    }
  }

  public nextQuestion() {
    if(this.hasNextQuestion()) {
      this.questionFormIndex++;
      this.saveQuestionFormIndex();
    }
  }

  public printResults() {
    this.confirmationService.confirm({
      message: "Etes-vous sûr de vouloir tout de même passer aux résultats?<br/>" +
        "Vous ne pourrez plus changer vos réponses.",
      icon: 'pi pi-info-circle',
      accept: () => {
        sessionStorage.setItem('endTime', JSON.stringify(new Date().getTime()));
        this.questionForms.forEach(questionForm => {
          questionForm.checkAnswer();
        });
        this.saveQuestionForms();
        sessionStorage.setItem('questionFormIndex', JSON.stringify(0));
        this.router.navigate(['/resultats']);
      }
    });
  }

  public checkAnswer(questionForm: QuestionForm) {
    this.confirmationService.confirm({
      message: "Etes vous sûr de vouloir accéder à la correction?<br/>" +
        "Votre réponse ne pourra plus être changée. ",
      icon: 'pi pi-info-circle',
      accept: () => {
        this.questionForm.checkAnswer();
        this.saveQuestionForms();
      }
    });
  }

  public continueToNextQuestion(questionForm: QuestionForm) {
    if((questionForm.selectedAnswer !== undefined && questionForm.selectedAnswer !== null) || questionForm.validated) {
      this.nextQuestion();
    }
    else {
      this.confirmationService.confirm({
        message: "Aucune réponse n'a été sélectionnée.<br/>" +
          "Etes-vous sûr de vouloir tout de même passer à la question suivante? ",
        icon: 'pi pi-info-circle',
        accept: () => {
          this.nextQuestion();
        }
      });
    }
  }

  public return() {
    this.router.navigate(['/']);
  }

  public saveQuestionForms() {
    sessionStorage.setItem('questionForms', JSON.stringify(this.questionForms));
  }

  private saveQuestionFormIndex() {
    sessionStorage.setItem('questionFormIndex', JSON.stringify(this.questionFormIndex));
  }

}
