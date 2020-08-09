import {QuestionForm, QuestionSet} from "@app/data/questions";

export class QuizUtils {

  public static getQuestionForms(selectedQuestionSets: QuestionSet[], random: boolean, maxNbrQuestion: number): QuestionForm[] {
    let questionFormsTemp: QuestionForm[][] = selectedQuestionSets.map(qs => {
      return qs.questions.map((q, index) => {
        return new QuestionForm({topic: qs.topic, session: qs.session, index: index, question: q});
      });
    });

    let questionForms: QuestionForm[] = [].concat.apply([], questionFormsTemp);
    if(random) {
      QuizUtils.shuffle(questionForms);
    }
    if(maxNbrQuestion && maxNbrQuestion < questionForms.length) {
      questionForms = questionForms.slice(0, maxNbrQuestion);
    }

    return questionForms;
  }

  private static shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}
