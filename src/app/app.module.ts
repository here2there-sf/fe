import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './components/app/app.component';
import { MigrationComponent } from './components/migration/migration.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { BackupComponent } from './components/backup/backup.component';
import { MyOrganizationComponent } from './components/my-organization/my-organization.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService} from './services/auth.service';
import { AuthInterceptorService} from './services/auth-interceptor.service';
import { CanActivateViaAuthGuard} from './guards/can-activate-via-auth.guard';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import { OrganizationService } from './services/organization.service';
import { JsforceService } from './services/jsforce.service';
import { MetadataSelectionDialogComponent } from './dialogs/metadata-selection-dialog/metadata-selection-dialog.component';
import { EditOrganizationDialogComponent } from './dialogs/edit-organization-dialog/edit-organization-dialog.component';
import { CreateOrganizationDialogComponent } from './dialogs/create-organization-dialog/create-organization-dialog.component';
import { DeleteOrganizationDialogComponent } from './dialogs/delete-organization-dialog/delete-organization-dialog.component';
import { MetadataService } from './services/metadata.service';
import {LoadingService} from './loading.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewsComponent } from './components/news/news.component';
import { OrganizationFilterPipe } from './util/pipes/organization-filter.pipe';
import { PushComponent } from './components/push/push.component';
import { DownloadComponent } from './components/download/download.component';
import {ScheduleBackupDialogComponent} from './dialogs/schedule-backup-dialog/schedule-backup-dialog.component';
import {BackupService} from './services/backup.service';
import {DeleteBackupDialogComponent} from './dialogs/delete-backup-dialog/delete-backup-dialog.component';
import { BackupFilterPipe } from './util/pipes/backup-filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    MigrationComponent,
    HomeComponent,
    LoginComponent,
    BackupComponent,
    MyOrganizationComponent,
    SignupComponent,
    MetadataSelectionDialogComponent,
    EditOrganizationDialogComponent,
    CreateOrganizationDialogComponent,
    DeleteOrganizationDialogComponent,
    ScheduleBackupDialogComponent,
    DeleteBackupDialogComponent,
    DashboardComponent,
    NewsComponent,
    OrganizationFilterPipe,
    PushComponent,
    DownloadComponent,
    BackupFilterPipe,
  ],
  entryComponents: [
    MetadataSelectionDialogComponent,
    EditOrganizationDialogComponent,
    CreateOrganizationDialogComponent,
    DeleteOrganizationDialogComponent,
    ScheduleBackupDialogComponent,
    DeleteBackupDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    CanActivateViaAuthGuard,
    JsforceService,
    OrganizationService,
    MetadataService,
    BackupService,
    LoadingService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
