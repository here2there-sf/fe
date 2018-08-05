import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { FormArray } from '@angular/forms';
import { globals } from '../globals';
import { Observable } from 'rxjs';
import { MetadataService } from './metadata.service';
import { LoadingService} from '../loading.service';
import { Pull} from '../util/one-off/pull.enum';

@Injectable()
export class JsforceService {
  /**
   * Storage for Metadata between component changes.
   * */
  metadataTypes = [];
  metadataTypesLength: number;
  selectedMetadataTypes = [];

  stepper_index = Pull.LOGIN;

  metadataTypesFormArray: FormArray;

  public loading = false;

  constructor(private http: HttpClient,
              private errorSnackBar: MatSnackBar,
              public metadataService: MetadataService,
              private loadingService: LoadingService) {
    this.stepper_index = Pull.LOGIN;
  }

  _initMetadata() {
    this.loading = true;
    this.getOneOfPulls().subscribe(
      (res: any) => {
        this.loading = false;
        console.log('here');
        this.metadataService.updateOneOffPulls(res);
      });
  }

  getOneOfPulls(): Observable<Object> {
    const headers = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' })
    };
    return this.http.get(globals.FORCE_BASE + globals.FETCH_ONE_OFF_PULLS, headers);
  }

  listMetadataTypes(data: object) {
    this.metadataTypesLength = 0;

    this.loadingService.loading = true;
    this.metadataTypes = [];
    this.stepper_index = Pull.LOGIN;

    const headers = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' })
    };
    return this.http.post(globals.FORCE_BASE + globals.FETCH_METADATA_TYPES, data, headers);
  }

  selectAll() {
    if (this.selectedMetadataTypes.length >= this.metadataTypes.length) {
      this.selectedMetadataTypes = [];
    } else {
      this.metadataTypes.forEach((type) => {
        if (this.selectedMetadataTypes.indexOf(type.xmlName < 0)) {
          this.selectedMetadataTypes.push(type.xmlName);
        }
        if (type.childXmlNames) {
          type.childXmlNames.forEach((child) => {
            if (this.selectedMetadataTypes.indexOf(child < 0)) {
              this.selectedMetadataTypes.push(child);
            }
          });
        }
      });
    }
  }

  pull(data: {organization_id}) {
    data['package'] = this.selectedMetadataTypes;

    const headers = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' })
    };
    console.log(data);
    return this.http.post(globals.FORCE_BASE + globals.ONE_OFF_PULL, data, headers);
  }

  push(data) {
    const headers = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' })
    };
    return this.http.post(globals.FORCE_BASE + globals.ONE_OFF_PUSH, data, headers);
  }

  checkPullStatus(data: object) {
    const headers = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' })
    };
    return this.http.post(globals.FORCE_BASE + globals.CHECK_RETRIEVE_STATUS, data, headers);
  }

  checkPushStatus(data: object) {
    const headers = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' })
    };
    return this.http.post(globals.FORCE_BASE + globals.CHECK_DEPLOY_STATUS, data, headers);
  }

  openSnackBar(message: string, duration = 3000) {
    this.errorSnackBar.open(message, null, {
      duration: duration,
    });
  }
}
