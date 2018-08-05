import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOrganizationDialogComponent } from './delete-organization-dialog.component';

describe('DeleteOrganizationDialogComponent', () => {
  let component: DeleteOrganizationDialogComponent;
  let fixture: ComponentFixture<DeleteOrganizationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteOrganizationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteOrganizationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
