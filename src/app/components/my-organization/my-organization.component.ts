import { Component, OnInit, ViewChild } from '@angular/core';
import { OrganizationService } from '../../services/organization.service';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { EditOrganizationDialogComponent } from '../../dialogs/edit-organization-dialog/edit-organization-dialog.component';
import { CreateOrganizationDialogComponent } from '../../dialogs/create-organization-dialog/create-organization-dialog.component';
import { DeleteOrganizationDialogComponent } from '../../dialogs/delete-organization-dialog/delete-organization-dialog.component';
import { ScheduleBackupDialogComponent } from '../../dialogs/schedule-backup-dialog/schedule-backup-dialog.component';

@Component({
  selector: 'app-my-organization',
  templateUrl: './my-organization.component.html',
  styleUrls: ['./my-organization.component.scss']
})

export class MyOrganizationComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;

  displayedColumns: string[] = ['actions', 'alias', 'email', 'type', 'createdAt', 'updatedAt'];

  constructor(private orgService: OrganizationService, private dialog: MatDialog) { }

  ngOnInit() {
    this.initializeDataSource();
  }

  openEditOrganizationDialog(organization): void {
    const dialogRef = this.dialog.open(EditOrganizationDialogComponent, {
      width: '500px',
      height: '550px',
      data: organization,
    });
    dialogRef.afterClosed().subscribe((edited) => {
      if (edited) {
        this.initializeDataSource();
      }
    });
  }

  openCreateOrganizationDialog() {
    const dialogRef = this.dialog.open(CreateOrganizationDialogComponent, {
      width: '500px',
      height: '550px',
    });
    dialogRef.afterClosed().subscribe((created) => {
      if (created) {
        this.initializeDataSource();
      }
    });
  }

  openDeleteOrganizationDialog(organization) {
    const dialogRef = this.dialog.open(DeleteOrganizationDialogComponent, {
      width: '500px',
      height: '550px',
      data: organization,
    });
    dialogRef.afterClosed().subscribe((deleted) => {
      if (deleted) {
        this.initializeDataSource();
      }
    });
  }

  openScheduleBackupDialog(organization) {
    this.dialog.open(ScheduleBackupDialogComponent, {
      width: '500px',
      height: '550px',
      data: organization,
    });
  }

  initializeDataSource() {
    this.orgService.getOrganizations().subscribe(
      (backups: any) => {
        this.dataSource = new MatTableDataSource(backups);
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
