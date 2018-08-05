import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../../services/organization.service';
import { EditOrganizationDialogComponent } from '../edit-organization-dialog/edit-organization-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import {LoadingService} from '../../loading.service';

@Component({
  selector: 'app-create-organization-dialog',
  templateUrl: './create-organization-dialog.component.html',
  styleUrls: ['./create-organization-dialog.component.scss']
})

export class CreateOrganizationDialogComponent implements OnInit {
  createOrganizationForm: FormGroup;
  createOrganizationFormTokenHide = true;
  createOrganizationFormPasswordHide = true;

  constructor(private dialogRef: MatDialogRef<EditOrganizationDialogComponent>,
              private _formBuilder: FormBuilder,
              private orgService: OrganizationService,
              private loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.createOrganizationForm = this._formBuilder.group({
      alias: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      securityToken: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  save(): void {
    this.loadingService.loading = true;
    this.orgService.create({
      alias: this.createOrganizationForm.controls['alias'].value,
      email: this.createOrganizationForm.controls['email'].value,
      password: this.createOrganizationForm.controls['password'].value,
      securityToken: this.createOrganizationForm.controls['securityToken'].value,
      type: this.createOrganizationForm.controls['type'].value,
    });
    this.dialogRef.close(true);
  }

  toggleVisibilityPassword() {
    this.createOrganizationFormPasswordHide = !this.createOrganizationFormPasswordHide;
  }

  toggleVisibilitySecurity() {
    this.createOrganizationFormTokenHide = !this.createOrganizationFormTokenHide;
  }

}
