import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import {MatPaginator, MatSnackBar, MatTableDataSource} from '@angular/material';
import { JsforceService } from './jsforce.service';
import { globals } from '../globals';
import { LoadingService } from '../loading.service';

export interface Backup {
  _id: string;
  _organization: string;
  organization: Array<any>;
  frequency: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

@Injectable()
export class BackupService {

  frequency = [
    {name: 'Daily', value: 60 * 60 * 24},
    {name: 'Weekly', value: 60 * 60 * 24 * 7},
    {name: 'Monthly', value: 60 * 60 * 24 * 30},
  ];

  backups = [];
  backupsDataSource: MatTableDataSource<Backup>;
  paginator: MatPaginator;

  constructor(private http: HttpClient,
              private router: Router,
              private authService: AuthService,
              private forceService: JsforceService,
              private loadingService: LoadingService,
              private errorSnackBar: MatSnackBar) {
    this._initBackups();
  }

  _initBackups() {
    const headers = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache', 'Authorization': this.authService.token })
    };

    return this.http.get(globals.FORCE_BASE + globals.FETCH_BACKUPS, headers).subscribe(
      (res: any) => {
        this.backups = res;
        this.backupsDataSource = res;
        this.backupsDataSource.paginator = this.paginator;
      },
      (error: any) => {
        console.log(error);
      });
  }

  getBackups() {
    const headers = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache', 'Authorization': this.authService.token })
    };

    return this.http.get(globals.FORCE_BASE + globals.FETCH_BACKUPS, headers);
  }


  create(data: {organization: string, frequency: number, startDate: string}): void {
    this.loadingService.start('Scheduling backup');

    const headers = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache'})
    };
    this.http.post(globals.FORCE_BASE + globals.SCHEDULE_BACKUP, data, headers).subscribe(
      (res: any) => {
        console.log(res);
        this._initBackups();
        this.openSnackBar('Backup successfully scheduled.', 4000);
        this.loadingService.stop();
      },
      (error: any) => {
        console.log(error);
        this.openSnackBar(error.message);
        this.loadingService.stop();
      });
  }

  delete(data: { id: string }) {
    // Angular http.delete does not contain body
    // Create custom request
    this.http.request('DELETE', globals.FORCE_BASE + globals.DELETE_BACKUP, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': this.authService.token
      }),
      body: data
    }).subscribe(
      (res: any) => {
        this._initBackups();
        this.loadingService.stop();
      },
      (error: any) => {
        this.openSnackBar(error.message);
        this.loadingService.stop();
      });
  }

  update(data: { alias: string; email: string; password: string; securityToken: string; type: string, id: string}) {
    this.loadingService.start('Updating scheduled backup');
    const headers = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache', 'Authorization': this.authService.token })
    };
    this.http.put(globals.FORCE_BASE + globals.UPDATE_BACKUP, data, headers).subscribe(
      (res: any) => {
        this._initBackups();
        this.loadingService.stop();
      },
      (error: any) => {
        this.openSnackBar(error.error.message);
        this.loadingService.stop();
      });
  }

  getFrequency(value: number) {
    for (const freq of this.frequency) {
      if (freq['value'] === value) {
        return freq['name'];
      }
    }
  }

  openSnackBar(message: string, duration = 3000) {
    this.errorSnackBar.open(message, null, {
      duration: duration,
    });
  }

}
