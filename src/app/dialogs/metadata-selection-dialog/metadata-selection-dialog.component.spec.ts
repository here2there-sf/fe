import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataSelectionDialogComponent } from './metadata-selection-dialog.component';

describe('MetadataSelectionDialogComponent', () => {
  let component: MetadataSelectionDialogComponent;
  let fixture: ComponentFixture<MetadataSelectionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetadataSelectionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataSelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
