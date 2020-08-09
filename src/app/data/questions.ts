export class QuestionSet {
  topic: string;
  session: string;
  pretext: string;
  questions: Question[];
}

export class QuestionForm {
  topic: string;
  session: string;
  index: number;
  question: Question;
  selectedAnswer?: number;
  correct?: boolean;
  validated?: boolean;

  constructor(questionForm) {
    this.topic = questionForm.topic;
    this.session = questionForm.session;
    this.index = questionForm.index;
    this.question = questionForm.question;
    this.selectedAnswer = questionForm.selectedAnswer;
    this.correct = questionForm.correct;
    this.validated = questionForm.validated;
  }

  checkAnswer() {
    this.correct = this.hasSelectedAnswer() ?
      this.question.answers[this.selectedAnswer].correct : false;
    this.validate();
  }

  validate() {
    this.validated = true;
  }

  hasSelectedAnswer() {
    return this.selectedAnswer !== undefined && this.selectedAnswer !== null;
  }
}

export class Question {
  text: string;
  answers: Answer[];
}

export class Answer {
  text: string;
  correct: boolean;
}

// export enum QuizPhase {
//   FORM,
//   PRETEXT,
//   QUIZ,
//   RESULTS,
//   RESPONSES
// }
