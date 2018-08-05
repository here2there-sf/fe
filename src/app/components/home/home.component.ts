import { Component, OnInit } from '@angular/core';
import {MetadataService} from '../../services/metadata.service';
import {OrganizationService} from '../../services/organization.service';
import {JsforceService} from '../../services/jsforce.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  count: number;
  icon: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tiles: Tile[] = [
    {text: 'My Organizations', cols: 1, rows: 1, color: 'lightblue', count: 12, icon: 'cloud'},
    {text: 'Quick Pulls', cols: 1, rows: 1, color: 'lightgreen', count: 5, icon: 'cloud'},
    {text: 'Migrations', cols: 1, rows: 1, color: 'lightpink', count: 0, icon: 'cloud'},
    {text: 'Backups', cols: 1, rows: 1, color: '#DDBDF1', count: 0, icon: 'cloud'},
  ];
  constructor(public forceService: JsforceService,
              public metadataService: MetadataService,
              public orgService: OrganizationService) {
    this.forceService._initMetadata();
  }

  ngOnInit() { }
}
