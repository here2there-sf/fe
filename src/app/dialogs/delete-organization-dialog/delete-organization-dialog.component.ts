import { Component, Inject, OnInit } from '@angular/core';
import { OrganizationService } from '../../services/organization.service';
import { EditOrganizationDialogComponent } from '../edit-organization-dialog/edit-organization-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { LoadingService } from '../../loading.service';

@Component({
  selector: 'app-delete-organization-dialog',
  templateUrl: './delete-organization-dialog.component.html',
  styleUrls: ['./delete-organization-dialog.component.scss']
})
export class DeleteOrganizationDialogComponent implements OnInit {
  deleteOrganizationForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<EditOrganizationDialogComponent>,
              private _formBuilder: FormBuilder,
              public orgService: OrganizationService,
              public loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.deleteOrganizationForm = this._formBuilder.group({
      alias: ['', [Validators.required]],
    });
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  delete() {
    this.loadingService.loading = true;
    this.orgService.delete({
      id: this.data.id,
    });
    this.dialogRef.close(true);
  }
}
