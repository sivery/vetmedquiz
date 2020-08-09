import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Route} from "@app/core";
import {QuizComponent} from "@app/quiz/quiz.component";
import {PretextComponent} from "@app/pretext/pretext.component";
import {FormComponent} from "@app/form/form.component";
import {ResultsComponent} from "@app/results/results.component";
import {CanDeactivateQuizGuard} from "@app/quiz/can-deactivate-quiz.guard";
import {SourcesComponent} from "@app/sources/sources.component";
import {ContactComponent} from "@app/contact/contact.component";

const routes: Routes = [
  Route.withShell([
    {path: '', component: FormComponent},
    {path: 'preambule', component: PretextComponent},
    {path: 'quiz', component : QuizComponent, data: { responses: false }, canDeactivate: [CanDeactivateQuizGuard]},
    {path: 'resultats', component: ResultsComponent},
    {path: 'reponses', component: QuizComponent, data: { responses: true }, canDeactivate: [CanDeactivateQuizGuard]},
    {path: 'sources', component: SourcesComponent},
    {path: 'contact', component: ContactComponent},
    { path: '**', redirectTo: '/', pathMatch: 'full' },
  ])
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
