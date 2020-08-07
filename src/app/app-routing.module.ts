import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Route} from "@app/core";
import {QuizComponent} from "@app/quiz/quiz.component";

const routes: Routes = [
  Route.withShell([
    {path: '', component: QuizComponent},
  ])
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
