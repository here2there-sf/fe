import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { OrganizationService } from '../../services/organization.service';
import { EditOrganizationDialogComponent } from '../edit-organization-dialog/edit-organization-dialog.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDatepicker, MatDialogRef} from '@angular/material';
import { LoadingService } from '../../loading.service';
import {BackupService} from '../../services/backup.service';

@Component({
  selector: 'app-schedule-backup-dialog',
  templateUrl: './schedule-backup-dialog.component.html',
  styleUrls: ['./schedule-backup-dialog.component.scss']
})

export class ScheduleBackupDialogComponent implements OnInit {
  scheduleBackupForm: FormGroup;
  min = new Date();

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private dialogRef: MatDialogRef<EditOrganizationDialogComponent>,
              private _formBuilder: FormBuilder,
              private orgService: OrganizationService,
              private backupService: BackupService,
              private loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.scheduleBackupForm = this._formBuilder.group({
      organization: ['', Validators.required],
      frequency: ['', Validators.required],
      startDate: [{value: null, disabled: true}],

    });
    this.scheduleBackupForm.controls['organization'].setValue(this.orgService.organizations.find(org => org.id === this.data.id));
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  save(): void {
    this.loadingService.start('Scheduling backup');
    this.backupService.create({
      organization: this.scheduleBackupForm.controls['organization'].value.id,
      frequency: this.scheduleBackupForm.controls['frequency'].value,
      startDate: this.scheduleBackupForm.controls['startDate'].value,
    });
    this.dialogRef.close(true);
  }
}
