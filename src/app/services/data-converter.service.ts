import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {QuestionDefinition} from "@app/data/ariquiz";
import {Answer, Question, QuestionSet} from "@app/data/questions";
import {Constants} from "@app/data/constants";

@Injectable({
  providedIn: 'root'
})
export class DataConverterService {

  private questionSets: QuestionSet[] = [];

  constructor(private http: HttpClient) { }

  public convertData() {
    let self = this;
    this.http.get('/raw_quizz_data.json').subscribe((questionDefs: QuestionDefinition[]) => {
      self.questionSets = questionDefs.map(questionDef => {
        let questionSet = new QuestionSet();
        questionSet.topic = questionDef.topic;
        questionSet.session = questionDef.session;
        questionSet.pretext = questionDef.extra;

        let questions = questionDef.response.map(r => {
          return r.questions.map(q => {
            let question = new Question();
            question.text = q.questionText;
            question.answers = q.questionData.data.map(a => {
              let answer = new Answer();
              answer.text = a.tbxAnswer;
              answer.correct = a.hidCorrect === 'true' ? true : false;
              return answer;
            });

            return question;
          });
        });

        questionSet.questions = [].concat.apply([], questions);

        return questionSet;
      });

      console.log(JSON.stringify(self.questionSets));
    });
  }
}
