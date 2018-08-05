import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material';
import { JsforceService } from './jsforce.service';
import { globals } from '../globals';
import {LoadingService} from '../loading.service';

@Injectable()
export class OrganizationService {

  types = [
    'sandbox',
    'development',
    'production'
  ];
  count = {
    sandbox: 0,
    development: 0,
    production: 0
  };
  my_organizations = [];

  constructor(private http: HttpClient,
              private router: Router,
              private authService: AuthService,
              private forceService: JsforceService,
              private loadingService: LoadingService,
              private errorSnackBar: MatSnackBar) {
    this._initOrganizations();
  }

  get organizations() {
    return this.my_organizations;
  }

  getOrganizations() {
    const headers = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache', 'Authorization': this.authService.token })
    };

    return this.http.get(globals.ORG_BASE + globals.FETCH_ORGANIZATIONS, headers);
  }

  _initOrganizations() {
    const headers = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache', 'Authorization': this.authService.token })
    };

    return this.http.get(globals.ORG_BASE + globals.FETCH_ORGANIZATIONS, headers).subscribe(
      (res: any) => {
        console.log(res);

        this.my_organizations = res;
        this.count.sandbox = 0;
        this.count.development = 0;
        this.count.production = 0;
        this.my_organizations.forEach(org => {
          if (org.type === 'sandbox') {
            this.count.sandbox++;
          } else if (org.type === 'development') {
            this.count.development++;
          } else {
            this.count.production++;
          }
        });
      },
      (error: any) => {
        console.log(error);
      });
  }


  create(data: {alias: string, email: string, password: string, securityToken: string, type: string}): void {
    const headers = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache', 'Authorization': this.authService.token })
    };
    this.http.post(globals.ORG_BASE + globals.CREATE_ORGANIZATION, data, headers).subscribe(
      (res: any) => {
        this._initOrganizations();
        this.loadingService.loading = false;
      },
      (error: any) => {
        this.openSnackBar(error.error.message);
        this.loadingService.loading = false;
      });
  }

  delete(data: { id: string }) {
    // Angular http.delete does not contain body
    // Create custom request
    this.http.request('DELETE', globals.ORG_BASE + globals.DELETE_ORGANIZATION, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': this.authService.token
      }),
      body: data
    }).subscribe(
      (res: any) => {
        this._initOrganizations();
        this.loadingService.loading = false;
      },
      (error: any) => {
        this.openSnackBar(error.error.message);
        this.loadingService.loading = false;
      });
  }

  update(data: { alias: string; email: string; password: string; securityToken: string; type: string, id: string}) {
    const headers = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache', 'Authorization': this.authService.token })
    };
    this.http.put(globals.ORG_BASE + globals.UPDATE_ORGANIZATION, data, headers).subscribe(
      (res: any) => {
        this._initOrganizations();
        this.loadingService.loading = false;
      },
      (error: any) => {
        this.openSnackBar(error.error.message);
        this.loadingService.loading = false;
      });
  }

  openSnackBar(message: string, duration = 3000) {
    this.errorSnackBar.open(message, null, {
      duration: duration,
    });
  }

}
