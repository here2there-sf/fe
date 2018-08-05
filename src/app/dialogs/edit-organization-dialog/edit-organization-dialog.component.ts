import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OrganizationService} from '../../services/organization.service';
import {LoadingService} from '../../loading.service';

@Component({
  selector: 'app-edit-organization-dialog',
  templateUrl: './edit-organization-dialog.component.html',
  styleUrls: ['./edit-organization-dialog.component.scss']
})

export class EditOrganizationDialogComponent implements OnInit {
  editOrganizationForm: FormGroup;

  editOrganizationFormTokenHide = true;
  editOrganizationFormPasswordHide = true;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private dialogRef: MatDialogRef<EditOrganizationDialogComponent>,
              private _formBuilder: FormBuilder,
              private orgService: OrganizationService,
              private loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.editOrganizationForm = this._formBuilder.group({
      alias: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      securityToken: ['', Validators.required],
      type: ['', Validators.required],
      id: ['', ''],
    });

    // initialize default form fields
    this.editOrganizationForm.controls['alias'].setValue(this.data.alias);
    this.editOrganizationForm.controls['email'].setValue(this.data.email);
    this.editOrganizationForm.controls['type'].setValue(this.data.type);
    this.editOrganizationForm.controls['id'].setValue(this.data.id);

  }

  toggleVisibilityPassword() {
    this.editOrganizationFormPasswordHide = !this.editOrganizationFormPasswordHide;
  }
  toggleVisibilitySecurity() {
    this.editOrganizationFormTokenHide = !this.editOrganizationFormTokenHide;
  }

  cancel(): void {
    this.dialogRef.close();
  }
  update() {
    this.loadingService.loading = true;
    this.orgService.update({
      alias: this.editOrganizationForm.controls['alias'].value,
      email: this.editOrganizationForm.controls['email'].value,
      password: this.editOrganizationForm.controls['password'].value,
      securityToken: this.editOrganizationForm.controls['securityToken'].value,
      type: this.editOrganizationForm.controls['type'].value,
      id: this.editOrganizationForm.controls['id'].value,
    });
    this.dialogRef.close();
  }
}
