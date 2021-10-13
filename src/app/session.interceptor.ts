import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, PartialObserver } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable()
export class SessionInterceptor implements HttpInterceptor {

  constructor(private _messageService: MessageService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const sessionId = localStorage.getItem('sID');
    let authReq: any;
    if (sessionId && sessionId.trim())
      authReq = request.clone({ setHeaders: { auth: `${sessionId}` } });
    else authReq = request.clone();
    return new Observable((observer) => {
      next.handle(authReq).subscribe((res) => {
        if (res instanceof HttpResponse)
          observer.next(res);
      },
        (err: HttpErrorResponse) => {
          if (err.error instanceof ErrorEvent || err.error.fromImport) {
            // console.log('this is client side error');
            // errorMsg = `Error: ${error.error.message}`;
          } else {
            // this._translateService
            //   .get('ErrorHandler.' + err.error.msg)
            //   .toPromise()
            //   .then((errorMsg) => {
            this._messageService.add({
              severity: 'error',
              summary: 'ERROR!',
              life: 10000,
              detail: err.error.Message,
            });
            //   });
          }
          observer.error(err);
        });
    });
  }
}
