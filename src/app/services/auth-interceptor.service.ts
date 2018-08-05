import { Injectable, Injector } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { AuthService } from './auth.service';
import {Observable} from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector,
              private authService: AuthService) { }

  // Add auth token to requests and handle 401s
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthService);
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', '' + authService.token)
    });
    return next.handle(authRequest).pipe(tap(event => {}, err => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        // handle 401 errors
        this.authService.openSnackBar('Session has expired. Please login again.', 5000);
        this.authService.logout();
      }
    }));
  }
}
