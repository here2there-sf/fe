import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MigrationComponent} from './components/migration/migration.component';
import {HomeComponent} from './components/home/home.component';
import {BackupComponent} from './components/backup/backup.component';
import {MyOrganizationComponent} from './components/my-organization/my-organization.component';
import {CanActivateViaAuthGuard} from './guards/can-activate-via-auth.guard';
import {LoginComponent} from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import {PushComponent} from './components/push/push.component';
import {DownloadComponent} from './components/download/download.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [CanActivateViaAuthGuard] },
  { path: 'one-off/pull', component: MigrationComponent, canActivate: [CanActivateViaAuthGuard] },
  { path: 'one-off/push', component: PushComponent, canActivate: [CanActivateViaAuthGuard] },
  { path: 'one-off/download', component: DownloadComponent, canActivate: [CanActivateViaAuthGuard] },
  { path: 'backup', component: BackupComponent, canActivate: [CanActivateViaAuthGuard] },
  { path: 'myorg', component: MyOrganizationComponent, canActivate: [CanActivateViaAuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
