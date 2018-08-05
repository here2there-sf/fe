import { Component, OnInit, ViewChild } from '@angular/core';
import { OrganizationService } from '../../services/organization.service';
import { JsforceService } from '../../services/jsforce.service';
import { MetadataService } from '../../services/metadata.service';
import { LoadingService } from '../../loading.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

export interface Metadata {
  id: string;
  expiry: string;
  key: string;
  type: string;
  _organization: string;
  organization: Array<any>;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Metadata>;

  displayedColumns: string[] = ['actions', 'alias', 'email', 'type', 'createdAt', 'expiresAt'];

  constructor(public orgService: OrganizationService,
              public forceService: JsforceService,
              public metadataService: MetadataService,
              public loadingService: LoadingService) {
    this.forceService._initMetadata();
  }

  ngOnInit() {
    this.initializeDataSource();
  }

  initializeDataSource() {
    this.forceService.getOneOfPulls().subscribe(
      (metadata: any) => {
        this.dataSource = new MatTableDataSource<Metadata>(metadata);
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
