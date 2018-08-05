import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganizationService } from '../../services/organization.service';
import { JsforceService } from '../../services/jsforce.service';
import { MetadataService } from '../../services/metadata.service';
import { LoadingService } from '../../loading.service';
import {Pull} from '../../util/one-off/pull.enum';

@Component({
  selector: 'app-push',
  templateUrl: './push.component.html',
  styleUrls: ['./push.component.scss']
})
export class PushComponent implements OnInit {
  @ViewChild('stepper') stepper;

  private _selected_metadata;

  displayedColumns: string[] = ['actions', 'alias', 'email', 'type', 'createdAt'];

  destinationOrgFormGroup: FormGroup;
  originSavedOrganizationForm: FormGroup;
  originOrgPasswordHide = true;
  originOrgSecurityTokenHide = true;
  private pushStatusInterval: NodeJS.Timer;

  constructor(private _formBuilder: FormBuilder,
              public orgService: OrganizationService,
              public forceService: JsforceService,
              public metadataService: MetadataService,
              public loadingService: LoadingService) {
    this.forceService._initMetadata();
  }

  ngOnInit() {
    this.destinationOrgFormGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      securityToken: ['', Validators.required],
      type: ['', Validators.required],
      id: ['', ''],
    });
    this.originSavedOrganizationForm = this._formBuilder.group({
      savedOrg: ['', Validators.required]
    });
  }

  loadOrganizationData(event) {
    if (event) {
      this.destinationOrgFormGroup.controls['email'].setValue(event.email);
      this.destinationOrgFormGroup.controls['password'].setValue(Math.random().toString(36).substring(7));
      this.destinationOrgFormGroup.controls['securityToken'].setValue(Math.random().toString(36).substring(7));
      this.destinationOrgFormGroup.controls['type'].setValue(event.type);
      this.destinationOrgFormGroup.controls['id'].setValue(event.id);
    } else {
      this.destinationOrgFormGroup.reset();
    }
  }

  /**
   *
   * deploy
   *
   * */
  push() {
    const organization_id = this.destinationOrgFormGroup.controls['id'].value;
    console.log(this.selected_metadata);

    this.loadingService.loading = true;
    this.loadingService.message = 'Deploying metadata components';
    this.forceService.push({metadata_id: this.selected_metadata.id,
      organization_id: organization_id,
    }).subscribe(
      (res: any) => {
        this.pushStatusInterval = setInterval(() => {
          this.checkPushStatus({
            metadata_id: this.selected_metadata.id,
            push_id: res.id,
            organization_id: organization_id,
          }); }, 4000);
      });
  }

  get selected_metadata() {
    return this._selected_metadata;
  }

  set selected_metadata(value) {
    console.log(value);
    this._selected_metadata = value;
  }

  /***
   * Helper Functions
   * */
  toggleVisibilityOriginPassword() {
    this.originOrgPasswordHide = !this.originOrgPasswordHide;
  }
  toggleVisibilityOriginOrgSecurity() {
    this.originOrgSecurityTokenHide = !this.originOrgSecurityTokenHide;
  }

  resetStepper() {
    this.stepper.reset();
    this.selected_metadata = null;
  }

  private checkPushStatus(param: { metadata_id: any, push_id: any; organization_id: any }) {
    this.forceService.checkPushStatus(param).subscribe(
      (res: any) => {
        if (res.done) {
          if (res.success) {
            this.forceService.openSnackBar('Deploy was successful.');
          } else {
            this.forceService.openSnackBar('There was a problem deploying metadata. Deploy has been rolled back.');
          }
          clearInterval(this.pushStatusInterval);
          this.loadingService.loading = false;
          this.stepper.reset();
        }
        this.loadingService.message = 'Deploying ' + res.numberComponentsTotal + ' metadata components';
        console.log(res);
      },
      (err: any) => {
        console.log(err);
        clearInterval(this.pushStatusInterval);
        this.forceService.openSnackBar('There was a problem deploying metadata. Deploy has been rolled back.');
        this.loadingService.loading = false;
      });
  }
}
