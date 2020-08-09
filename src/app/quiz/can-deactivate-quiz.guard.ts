import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {QuizComponent} from "@app/quiz/quiz.component";
import {Observer} from "rxjs/internal/types";

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateQuizGuard implements CanDeactivate<unknown> {
  // canDeactivate(
  //   component: unknown,
  //   currentRoute: ActivatedRouteSnapshot,
  //   currentState: RouterStateSnapshot,
  //   nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }


  canDeactivate(component: QuizComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot) {
    return (nextState.url === '/resultats') ? true : new Observable((observer: Observer<boolean>) => {
      component.confirmationService.confirm({
        message: component.responses ? "Etes-vous sûr de vouloir quitter cette page?<br/>" +
          "Vous ne pourrez plus vérifier vos réponses." : "Etes-vous sûr de vouloir quitter le quiz avant de l'avoir terminer?",
        accept: () => {
          observer.next(true);
          observer.complete();
        },
        reject: () => {
          observer.next(false);
          observer.complete();
        }
      });
    });
  }

}
