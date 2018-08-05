import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { globals } from '../globals';
import {Metadata} from '../components/download/download.component';
import {MatTableDataSource} from '@angular/material';

@Injectable()
export class MetadataService {

  public _oneOffPulls = [];

  dataSource: MatTableDataSource<Metadata>;

  constructor(private http: HttpClient) {
  }

  updateOneOffPulls(data) {
    this._oneOffPulls = data;
    console.log(data);
    this._oneOffPulls.forEach((metadata) => {
      metadata.expiry = new Date(metadata.expiry);
      metadata.expiry.setDate(metadata.expiry.getDate() + 1);
    });
  }

  generateS3Url(data) {
    const headers = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' })
    };
    this.http.post(globals.FORCE_BASE + globals.DOWNLOAD_METADATA, data, headers).subscribe(
      (res: any) => {
        console.log(res);
        window.open(res);
      });
  }
}
