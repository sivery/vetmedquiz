import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConfirmationService, SelectItem} from "primeng";
import {Constants} from "@app/data/constants";
import {QuestionForm, QuestionSet, QuizPhase} from "@app/data/questions";


@Component({
  selector: 'app-quizz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  providers: [ConfirmationService]
})
export class QuizComponent implements OnInit {

  public phase: QuizPhase = QuizPhase.FORM;
  public QuizPhase = QuizPhase;

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
    {label: 'Google Form 2018', value: Constants.GFORM2018},
    {label: 'Google Form 2017', value: Constants.GFORM2017},
    {label: 'Septembre 2017', value: Constants.SEP2017},
    {label: 'Juillet 2017', value: Constants.JUL2017},
    {label: 'Septembre 2016', value: Constants.SEP2016},
    {label: 'Juillet 2016', value: Constants.JUL2016},
    {label: 'Septembre 2015', value: Constants.SEP2015},
    {label: 'Juillet 2015', value: Constants.JUL2015},
    {label: 'Septembre 2014', value: Constants.SEP2014},
    {label: 'Juillet 2014', value: Constants.JUL2014},
    {label: 'Septembre 2013', value: Constants.SEP2013},
    {label: 'Juillet 2013', value: Constants.JUL2013},
    {label: 'Questions supplémentaires', value: Constants.EXTRA},
  ];

  public selectedSessions: string[];

  private questionSets: QuestionSet[];
  public selectedQuestionSets: QuestionSet[];
  public questionForms: QuestionForm[];
  public questionFormIndex: number;

  public startTime: Date;
  public endTime: Date;

  get questionForm(): QuestionForm {
    return this.questionForms[this.questionFormIndex];
  }

  public maxNbrQuestion: number;

  constructor(private http: HttpClient, private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    let self = this;
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
    if(this.showPretextSection) {
      this.phase = QuizPhase.PRETEXT;
      this.showPretextSection = false;
    }
    else {
      this.phase = QuizPhase.QUIZ;
      let questionForms: QuestionForm[][] = this.selectedQuestionSets.map(qs => {
        return qs.questions.map((q, index) => {
          return new QuestionForm(qs.topic, qs.session, index, q);
        });
      });

      this.questionForms = [].concat.apply([], questionForms);
      if(this.random) {
        this.shuffle(this.questionForms);
      }
      if(this.maxNbrQuestion && this.maxNbrQuestion < this.questionForms.length) {
        this.questionForms = this.questionForms.slice(0, this.maxNbrQuestion);
      }

      this.questionFormIndex = 0;
      this.startTime = new Date();
    }
  }

  private shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
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
    }
  }

  public nextQuestion() {
    if(this.hasNextQuestion()) {
      this.questionFormIndex++;
    }
  }

  public printResults() {
    this.confirmationService.confirm({
      message: "Etes-vous sûr de vouloir tout de même passer aux résultats?\n" +
        "Vous nez pourrez plus changer vos réponses.",
      icon: 'pi pi-info-circle',
      accept: () => {
        this.endTime = new Date();
        this.questionForms.forEach(questionForm => {
          questionForm.checkAnswer();
        });
        this.questionFormIndex = 0;
        this.phase = QuizPhase.RESULTS;
      }
    });
  }

  public checkAnswer(questionForm: QuestionForm) {
    this.confirmationService.confirm({
      message: "Etes vous sûr de vouloir accéder à la correction?\n" +
        "Votre réponse ne pourra plus être changée. ",
      icon: 'pi pi-info-circle',
      accept: () => {
        this.questionForm.checkAnswer();
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
    this.phase = QuizPhase.RESPONSES;
  }

  public return() {
    this.confirmationService.confirm({
      message: "Are you you want to go back?\n" +
        "You won't be able to check the answers anymore. ",
      icon: 'pi pi-info-circle',
      accept: () => {
        this.showPretextSection = this.selectedQuestionSets.findIndex(qs => {return qs.pretext}) > -1;
        this.phase = QuizPhase.FORM;
      }
    });
  }

}
