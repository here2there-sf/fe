import { Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {LoadingService} from '../../loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  subtitles = {
    '/login': 'login',
    '/signup': 'signup',
    '/migration': 'migration',
    '/home': 'home',
    '/one-off/pull': 'pull',
    '/one-off/push': 'push',
    '/one-off/download': 'download',
    '/backup': 'backup',
    '/myorg': 'my organizations'
  };

  constructor(public authService: AuthService,
              public router: Router,
              public loadingService: LoadingService) {
  }
}
