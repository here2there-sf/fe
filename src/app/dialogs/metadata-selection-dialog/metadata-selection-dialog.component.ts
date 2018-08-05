import {Component, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { JsforceService } from '../../services/jsforce.service';


@Component({
  selector: 'app-metadata-selection-dialog',
  templateUrl: './metadata-selection-dialog.component.html',
  styleUrls: ['./metadata-selection-dialog.component.scss']
})
export class MetadataSelectionDialogComponent implements OnInit {
  tempSelectedMetadataTypes = [];

  qtd = [];

  constructor(
    private dialogRef: MatDialogRef<MetadataSelectionDialogComponent>,
    public forceService: JsforceService) { }

  ngOnInit(): void {
    this.tempSelectedMetadataTypes = this.forceService.selectedMetadataTypes;
  }

  close(): void {
    this.tempSelectedMetadataTypes = [];
    this.dialogRef.close(false);
  }
  confirm(): void {
    this.forceService.selectedMetadataTypes = this.tempSelectedMetadataTypes;
    this.dialogRef.close(true);
  }
  updateSelection(event, type, childXmlName) {
    event.stopPropagation();
    const self = this;
    if (childXmlName && type) {
      if (this.tempSelectedMetadataTypes.indexOf(childXmlName) > -1) {
        this.tempSelectedMetadataTypes.splice(this.tempSelectedMetadataTypes.indexOf(childXmlName), 1);
        this.tempSelectedMetadataTypes.splice(this.tempSelectedMetadataTypes.indexOf(type.xmlName), 1);
      } else {
        this.tempSelectedMetadataTypes.push(childXmlName);
        if (type.childXmlNames.every(function(val) { return self.tempSelectedMetadataTypes.indexOf(val) > -1; })) {
          this.tempSelectedMetadataTypes.push(type.xmlName);
        }
      }
    } else if (type && !childXmlName) {
      if (this.tempSelectedMetadataTypes.indexOf(type.xmlName) > -1) {
        this.tempSelectedMetadataTypes.splice(this.tempSelectedMetadataTypes.indexOf(type.xmlName), 1);
        if (type.childXmlNames) {
          type.childXmlNames.forEach(child => {
            this.tempSelectedMetadataTypes.splice(this.tempSelectedMetadataTypes.indexOf(child), 1);
          });
        }
      } else {
        this.tempSelectedMetadataTypes.push(type.xmlName);
        if (type.childXmlNames) {
          type.childXmlNames.forEach(child => this.tempSelectedMetadataTypes.push(child));
        }
      }
    }
  }
}
