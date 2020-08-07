export class QuestionDefinition {
  topic: string;
  session: string;
  id: number;
  extra?: string;
  response?: QuestionResponse[];
}

class Data {
  tbxAnswer: string;
  hidQueId: string;
  hidCorrect: string;
}

class QuestionData {
  data: Data[];
  view: any;
}

class Question {
  hasCorrectAnswer: boolean;
  questionData: QuestionData;
  questionId: number;
  questionText: string;
  questionType: string;
  questionIndex: string;
  completed: boolean;
}

export class QuestionResponse {
  pageId: number;
  pageNumber: number;
  description: string;
  questions: Question[];
  pageTime: any;
}
