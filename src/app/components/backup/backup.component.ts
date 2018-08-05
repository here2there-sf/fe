import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { EditOrganizationDialogComponent } from '../../dialogs/edit-organization-dialog/edit-organization-dialog.component';
import { ScheduleBackupDialogComponent } from '../../dialogs/schedule-backup-dialog/schedule-backup-dialog.component';
import { Backup, BackupService } from '../../services/backup.service';
import { DeleteBackupDialogComponent } from '../../dialogs/delete-backup-dialog/delete-backup-dialog.component';


@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.scss']
})

export class BackupComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Backup>;

  displayedColumns: string[] = ['actions', 'organization', 'type', 'frequency', 'startDate', 'createdAt', 'updatedAt'];

  constructor(public backupService: BackupService,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.initializeDataSource();
  }

  openEditBackupDialog(organization): void {
    this.dialog.open(EditOrganizationDialogComponent, {
      width: '500px',
      height: '550px',
      data: organization,
    });
  }

  openDeleteBackupDialog(backup) {
    const dialogRef = this.dialog.open(DeleteBackupDialogComponent, {
      width: '500px',
      height: '550px',
      data: backup,
    });

    dialogRef.afterClosed().subscribe((deleted: boolean) => {
      if (deleted) {
        this.initializeDataSource();
      }
    });
  }

  openScheduleBackupDialog() {
    const dialogRef = this.dialog.open(ScheduleBackupDialogComponent, {
      width: '500px',
      height: '550px',
      data: null,
    });

    dialogRef.afterClosed().subscribe((scheduled: boolean) => {
      if (scheduled) {
        this.initializeDataSource();
      }
    });
  }

  initializeDataSource() {
    this.backupService.getBackups().subscribe(
      (backups: any) => {
        this.dataSource = new MatTableDataSource<Backup>(backups);
        this.dataSource.filterPredicate = (data, filter: string)  => {
          const accumulator = (currentTerm, key) => {
            return this.nestedFilterCheck(currentTerm, data, key);
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          // Transform the filter by converting it to lowercase and removing whitespace.
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: any) => {
        console.log(error);
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }

}
