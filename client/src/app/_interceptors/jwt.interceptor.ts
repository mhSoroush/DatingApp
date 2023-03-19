import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // currentUser$ is an observable, so with take(1) we can only subscribed to one item. 
    // As a result, we dont need then to unsubscribe. 
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        // if the user is loged in, add token to the headers of the request
        if (user) {
          request = request.clone({
            setHeaders: {
              Authorization: 'Bearer ' + user.token 
            }
          });
        }
      }
    })
    return next.handle(request);
  }
}
