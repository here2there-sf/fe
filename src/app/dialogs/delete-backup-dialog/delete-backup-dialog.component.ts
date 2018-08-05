import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { LoadingService } from '../../loading.service';
import { BackupService } from '../../services/backup.service';

@Component({
  selector: 'app-delete-backup-dialog',
  templateUrl: './delete-backup-dialog.component.html',
  styleUrls: ['./delete-backup-dialog.component.scss']
})
export class DeleteBackupDialogComponent implements OnInit {
  deleteBackupForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<DeleteBackupDialogComponent>,
              private _formBuilder: FormBuilder,
              public backupService: BackupService,
              public loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.deleteBackupForm = this._formBuilder.group({
      organization: ['', [Validators.required]],
    });
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  delete() {
    this.loadingService.start('Deleting scheduled backup');
    this.backupService.delete({
      id: this.data.id,
    });
    this.dialogRef.close(true);
  }

}
