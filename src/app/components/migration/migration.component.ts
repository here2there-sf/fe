import { Component, OnInit, ViewChild } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { OrganizationService } from '../../services/organization.service';
import { JsforceService } from '../../services/jsforce.service';
import { MetadataSelectionDialogComponent } from '../../dialogs/metadata-selection-dialog/metadata-selection-dialog.component';
import { MatDialog } from '@angular/material';
import { MetadataService } from '../../services/metadata.service';
import { LoadingService } from '../../loading.service';
import { Pull } from '../../util/one-off/pull.enum';
import { Tab } from '../../util/one-off/tab.enum';

@Component({
  selector: 'app-migration',
  templateUrl: './migration.component.html',
  styleUrls: ['./migration.component.scss']
})
export class MigrationComponent implements OnInit {
  @ViewChild('stepper') stepper;
  @ViewChild('selectAllMetadataSlider') selectAllMetadataSlider;

  originOrgFormGroup: FormGroup;
  originSavedOrganizationForm: FormGroup;
  originOrgPasswordHide = true;
  originOrgSecurityTokenHide = true;
  private pullStatusInterval: NodeJS.Timer;

  constructor(private _formBuilder: FormBuilder,
              public orgService: OrganizationService,
              public forceService: JsforceService,
              public metadataService: MetadataService,
              public loadingService: LoadingService,
              public dialog: MatDialog) {
    this.forceService._initMetadata();
  }

  ngOnInit() {
    this.originOrgFormGroup = this._formBuilder.group({
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
      this.originOrgFormGroup.controls['email'].setValue(event.email);
      this.originOrgFormGroup.controls['password'].setValue(Math.random().toString(36).substring(7));
      this.originOrgFormGroup.controls['securityToken'].setValue(Math.random().toString(36).substring(7));
      this.originOrgFormGroup.controls['type'].setValue(event.type);
      this.originOrgFormGroup.controls['id'].setValue(event.id);
    } else {
      this.originOrgFormGroup.reset();
    }
  }

  listMetadataTypes() {
    this.loadingService.loading = true;
    this.loadingService.message = 'Retrieving metadata types';
    let data;
    if (this.originOrgFormGroup.controls['id'].value) {
      data = {
        id: this.originOrgFormGroup.controls['id'].value
      };
    } else {
      data = {
        email: this.originOrgFormGroup.controls['email'].value,
        password: this.originOrgFormGroup.controls['password'].value,
        securityToken: this.originOrgFormGroup.controls['securityToken'].value
      };
    }
    this.forceService.listMetadataTypes(data).subscribe(
      (res: any) => {
        res.forEach((type) => {
          this.forceService.metadataTypesLength++;
          if (type.childXmlNames) {
            type.childXmlNames.forEach((child) => {
              this.forceService.metadataTypesLength++;
            });
          }
        });

        this.forceService.stepper_index = Pull.SELECT_METADATA_TYPES;
        this.forceService.metadataTypes = res;
        this.forceService.metadataTypesFormArray = new FormArray(this.forceService.metadataTypes.map(c => new FormControl(false)));
        this.loadingService.loading = false;
        this.loadingService.message = '';

      },
      (err: any) => {
        this.forceService.stepper_index = Pull.LOGIN;
        this.loadingService.loading = false;
        this.loadingService.message = '';
        this.forceService.openSnackBar(err.error.message);
      });
  }

  /**
   * beginPull
   *
   * Starts the actual pull process. Sends a package.xml payload from the JsforceService.
   * */
  beginPull() {
    const id = this.originOrgFormGroup.controls['id'].value;
    this.loadingService.start('Retrieving metadata components');
    console.log(this.originOrgFormGroup.controls);
    this.forceService.pull({
      organization_id: id,
    }).subscribe(
      (res: any) => {
        console.log(res);
        this.pullStatusInterval = setInterval(() => {
          this.checkPullStatus(res.id, id); }, 4000);
      });
  }

  checkPullStatus(pull_id, org_id) {
    this.forceService.checkPullStatus({pull_id: pull_id, organization_id: org_id}).subscribe(
      (res: any) => {
        if (res.key) {
          clearInterval(this.pullStatusInterval);
          // retrieve fresh pulled metadata
          this.forceService._initMetadata();
          // reset selected metadata
          this.forceService.selectedMetadataTypes = [];
          // clear async pull check
          this.loadingService.stop();
          // reset one-off-pull stepper
          this.forceService.stepper_index = Pull.LOGIN;
          // reset slider
          this.selectAllMetadataSlider.checked = false;
          this.forceService.openSnackBar('Pull completed. Metadata is now available for download on the Quick Download page.', 5000);
        }
        console.log(res);
      },
      (err: any) => {
        console.log(err);
        clearInterval(this.pullStatusInterval);
        // reset loading service
        this.loadingService.stop();
        this.forceService.openSnackBar('Pull completed. Metadata is now available for download on the Quick Download page.', 5000);
        // reset one-off-pull stepper
        this.forceService.stepper_index = Pull.LOGIN;
        // reset slider
        this.selectAllMetadataSlider.checked = false;
        this.forceService.openSnackBar('There was a problem retrieving your metadata. Please try again.');
      });
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
  openDialog(): void {
    const dialogRef = this.dialog.open(MetadataSelectionDialogComponent, {
      width: '500px',
      height: '550px',
    }).afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        console.log(this.forceService.selectedMetadataTypes);
        this.selectAllMetadataSlider.checked = this.forceService.metadataTypesLength === this.forceService.selectedMetadataTypes.length;
      }
    });
  }
}
