import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { globals } from '../globals';
import * as jwt_decode from 'jwt-decode';
import {LoadingService} from '../loading.service';

@Injectable()
export class AuthService {
  TOKEN_KEY = 'Authorization';

  constructor(private http: HttpClient,
              private router: Router,
              private loadingService: LoadingService,
              private errorSnackBar: MatSnackBar) { }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    // force component reload
    this.router.navigate(['/login']);
  }

  login(username: string, password: string, next) {
    this.loadingService.start('Signing in');

    const headers = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' })
    };

    const body = {
      username: username,
      password: password
    };

    return this.http.post(globals.AUTH_BASE + globals.LOGIN, body, headers).subscribe(
      (res: any) => {
        this.loadingService.loading = false;
        localStorage.setItem(this.TOKEN_KEY, res.token);
        this.router.navigateByUrl('/home');
      },
      (error: any) => {
        this.loadingService.loading = false;
        next(error);
      },
      () => {
        next();
      });
  }

  signup(username: string, email: string, password: string, next) {
    this.loadingService.loading = true;

    const headers = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' })
    };
    const data = {
      username: username,
      password: password,
      email: email
    };

    this.http.post(globals.AUTH_BASE + globals.CREATE_USER, data, headers).subscribe(
      (res: any) => {
        this.loadingService.loading = false;
        localStorage.setItem(this.TOKEN_KEY, res.token);
        this.router.navigateByUrl('/home');
      },
      (error: any) => {
        this.loadingService.loading = false;
        next(error);
      },
      () => {
        next();
      });
  }

  openSnackBar(message: string, duration: number) {
    this.errorSnackBar.open(message, null, {
      duration: duration || 2000,
    });
  }



}
