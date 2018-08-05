import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(private authService: AuthService, private router: Router) {
    if (authService.isAuthenticated) {
      router.navigateByUrl('/home');
    }
  }

  getUserErrorMessage() {
    return this.username.hasError('required') ? 'Username is required' : '';
  }
  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'Password is required' : '';
  }
  login() {
    this.authService.login(this.username.value, this.password.value, (error) => {
      if (error) {
        console.log(error);
        this.authService.openSnackBar(error.error.message, 3000);
      }
    });
  }

  ngOnInit() {
  }
}
