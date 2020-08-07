import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {QuestionDefinition, QuestionResponse} from "@app/data/ariquiz";
import {Constants} from "@app/data/constants";

@Injectable({
  providedIn: 'root'
})
export class AriquizService {

  private urlIndex: number;
  private urls: QuestionDefinition[] = [
    { topic: Constants.PHYSIQUE, session: Constants.SEP2017, id:68},
    { topic: Constants.PHYSIQUE, session: Constants.JUL2017, id:62},
    { topic: Constants.PHYSIQUE, session: Constants.SEP2016, id:54},
    { topic: Constants.PHYSIQUE, session: Constants.JUL2016, id:47},
    { topic: Constants.PHYSIQUE, session: Constants.SEP2015, id:41},
    { topic: Constants.PHYSIQUE, session: Constants.JUL2015, id:40},
    { topic: Constants.PHYSIQUE, session: Constants.SEP2014, id:39},
    { topic: Constants.PHYSIQUE, session: Constants.JUL2014, id:38},
    { topic: Constants.PHYSIQUE, session: Constants.SEP2013, id:37},
    { topic: Constants.PHYSIQUE, session: Constants.JUL2013, id:36},
    { topic: Constants.PHYSIQUE, session: Constants.EXTRA, id:42},
    { topic: Constants.BIOLOGY, session: Constants.SEP2017, id:67},
    { topic: Constants.BIOLOGY, session: Constants.JUL2017, id:59},
    { topic: Constants.BIOLOGY, session: Constants.SEP2016, id:51},
    { topic: Constants.BIOLOGY, session: Constants.JUL2016, id:45},
    { topic: Constants.BIOLOGY, session: Constants.SEP2015, id:13},
    { topic: Constants.BIOLOGY, session: Constants.JUL2015, id:12},
    { topic: Constants.BIOLOGY, session: Constants.SEP2014, id:11},
    { topic: Constants.BIOLOGY, session: Constants.JUL2014, id:10},
    { topic: Constants.BIOLOGY, session: Constants.SEP2013, id:9},
    { topic: Constants.BIOLOGY, session: Constants.JUL2013, id:8},
    { topic: Constants.BIOLOGY, session: Constants.EXTRA, id:14},
    { topic: Constants.CHEMISTRY, session: Constants.SEP2017, id:69},
    { topic: Constants.CHEMISTRY, session: Constants.JUL2017, id:63},
    { topic: Constants.CHEMISTRY, session: Constants.SEP2016, id:55},
    { topic: Constants.CHEMISTRY, session: Constants.JUL2016, id:48},
    { topic: Constants.CHEMISTRY, session: Constants.SEP2015, id:20},
    { topic: Constants.CHEMISTRY, session: Constants.JUL2015, id:19},
    { topic: Constants.CHEMISTRY, session: Constants.SEP2014, id:18},
    { topic: Constants.CHEMISTRY, session: Constants.JUL2014, id:17},
    { topic: Constants.CHEMISTRY, session: Constants.SEP2013, id:16},
    { topic: Constants.CHEMISTRY, session: Constants.JUL2013, id:15},
    { topic: Constants.CHEMISTRY, session: Constants.EXTRA, id:21},
    { topic: Constants.MATHEMATICS, session: Constants.SEP2017, id:64},
    { topic: Constants.MATHEMATICS, session: Constants.JUL2017, id:60},
    { topic: Constants.MATHEMATICS, session: Constants.SEP2016, id:49},
    { topic: Constants.MATHEMATICS, session: Constants.JUL2016, id:43},
    { topic: Constants.MATHEMATICS, session: Constants.SEP2015, id:34},
    { topic: Constants.MATHEMATICS, session: Constants.JUL2015, id:33},
    { topic: Constants.MATHEMATICS, session: Constants.SEP2014, id:32},
    { topic: Constants.MATHEMATICS, session: Constants.JUL2014, id:31},
    { topic: Constants.MATHEMATICS, session: Constants.SEP2013, id:30},
    { topic: Constants.MATHEMATICS, session: Constants.JUL2013, id:29},
    { topic: Constants.MATHEMATICS, session: Constants.EXTRA, id:35},
    { topic: Constants.ENGLISH, session: Constants.SEP2017, id:66},
    { topic: Constants.ENGLISH, session: Constants.JUL2017, id:61},
    { topic: Constants.ENGLISH, session: Constants.SEP2016, id:50},
    { topic: Constants.ENGLISH, session: Constants.JUL2016, id:44},
    { topic: Constants.ENGLISH, session: Constants.SEP2015, id:6},
    { topic: Constants.ENGLISH, session: Constants.JUL2015, id:5},
    { topic: Constants.ENGLISH, session: Constants.SEP2014, id:4},
    { topic: Constants.ENGLISH, session: Constants.JUL2014, id:3},
    { topic: Constants.ENGLISH, session: Constants.SEP2013, id:2},
    { topic: Constants.ENGLISH, session: Constants.JUL2013, id:1},
    { topic: Constants.ENGLISH, session: Constants.EXTRA, id:7},
    { topic: Constants.FRENCH, session: Constants.SEP2017, id:65},
    { topic: Constants.FRENCH, session: Constants.JUL2017, id:58},
    { topic: Constants.FRENCH, session: Constants.SEP2016, id:52},
    { topic: Constants.FRENCH, session: Constants.JUL2016, id:46},
    { topic: Constants.FRENCH, session: Constants.SEP2015, id:27},
    { topic: Constants.FRENCH, session: Constants.JUL2015, id:26},
    { topic: Constants.FRENCH, session: Constants.SEP2014, id:25},
    { topic: Constants.FRENCH, session: Constants.JUL2014, id:24},
    { topic: Constants.FRENCH, session: Constants.SEP2013, id:23},
    { topic: Constants.FRENCH, session: Constants.JUL2013, id:22},
    { topic: Constants.FRENCH, session: Constants.EXTRA, id:28},
  ];
  private option = 'com_ariquiz';
  private questionView = 'question';
  private quizView = 'quiz';
  private questionUrl = "/ares/index.php";
  private ticketUrl = "/fr/etudes-superieures/organisation-pratique-et-catalogue-etudes/physique";
  private ticketId: string;
  private quizId: number;
  private currentPageId: number;
  private currentQuestionId: number;
  private currentQuestionFirstAnswer: string;
  private retry: number;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService) { }

  public clickButton() {
    this.urlIndex = 0;
    this.getTicket();
    // this.getQuestion();
  }

  private getTicket() {
    let self = this;

    self.cookieService.delete('ariQuizTicketId');

    self.retry = 0;

    var formData: any = new FormData();
    formData.append("option", this.option);
    formData.append("view", this.quizView);
    formData.append("quizId", this.urls[this.urlIndex].id);
    formData.append("task", 'takeQuiz');
    return this.http.post(this.ticketUrl, formData, { observe: 'response', responseType: 'text' }).subscribe(resp =>{
      let lastPart = resp.url.substring(resp.url.lastIndexOf('/') + 1);
      let quizzComps = lastPart.split('-');
      self.quizId = parseInt(quizzComps[1]);
      self.ticketId = quizzComps[2];
      this.getQuestion();
    });
  }

  private getQuestion() {
    let self = this;

    var formData: any = new FormData();
    formData.append("option", this.option);
    formData.append("view", this.questionView);
    formData.append("ticketId", this.ticketId);
    formData.append("quizId", this.quizId);
    formData.append("task", 'ajaxGetPage');
    formData.append("parseTag", 0);

    return this.http.post<QuestionResponse>(this.questionUrl, formData).subscribe((data : QuestionResponse) => {
      self.retry = 0;
      if(data) {
        // console.log(data);
        if(!this.urls[this.urlIndex].response) {
          this.urls[this.urlIndex].response = [];
        }
        this.urls[this.urlIndex].response.push(data);
        self.currentPageId = data.pageId;
        self.currentQuestionId = data.questions[0].questionId;
        self.currentQuestionFirstAnswer = data.questions[0].questionData.data[0].hidQueId;
        self.postQuestionAnswer();
      }
      else {
        self.urlIndex++;
        if(self.urlIndex < self.urls.length) {
          this.getTicket();
        }
        else {
          console.log(JSON.stringify(self.urls));
        }
      }
    }, (err) => {
      console.log(err);
      if(this.retry < 3) {
        self.retry++;
        self.postQuestionAnswer();

      }
    });
  }

  private postQuestionAnswer() {

    var formData: any = new FormData();
    formData.append("pageId", this.currentPageId);
    formData.append("ticketId", this.ticketId);
    formData.append("timeOver", 0);
    formData.append("option", this.option);
    formData.append("view", this.questionView);
    formData.append("task", 'ajaxSavePage');
    formData.append("quizId", this.quizId)
    formData.append('selectedAnswer_' + this.currentQuestionId, this.currentQuestionFirstAnswer);

    let self = this;

    return this.http.post<any>(this.questionUrl, formData).subscribe((data : any) => {
      self.retry = 0;
      if(data.moveToNext) {
        self.getQuestion();
      }
    }, (err) => {
      console.log(err);
      if(this.retry < 3) {
        self.retry++;
        self.postQuestionAnswer();

      }
    });

  }
}
