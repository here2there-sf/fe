import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../../services/organization.service';
import { JsforceService } from '../../services/jsforce.service';
import { MetadataService } from '../../services/metadata.service';
import { Tab } from '../../util/one-off/tab.enum';
import {BackupService} from '../../services/backup.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public forceService: JsforceService,
              public metadataService: MetadataService,
              public orgService: OrganizationService,
              public backupService: BackupService) { }

  ngOnInit() { }

}
