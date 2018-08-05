import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  hide = true;
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private authService: AuthService, public errorSnackBar: MatSnackBar, private router: Router) {
    if (this.authService.isAuthenticated) {
      this.router.navigateByUrl('/home');
    }
  }

  getUserErrorMessage() {
    return this.username.hasError('required') ? 'Username is required' : '';
  }
  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'Password is required' : '';
  }
  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Email is required';
    } else if (this.email.hasError('email')) {
      return 'Email is invalid';
    } else {
      return '';
    }
  }
  signup() {
    this.authService.signup(this.username.value, this.email.value, this.password.value, (error) => {
      if (error.error.errors.username) {
        this.openSnackBar(error.error.errors.username);
      }
      if (error.error.errors.email) {
        this.openSnackBar(error.error.errors.email);
      }
      if (error.error.errors.password) {
        this.openSnackBar(error.error.errors.password);
      }
    });
  }
  openSnackBar(message: string) {
    this.errorSnackBar.open(message, null, {
      duration: 2000,
    });
  }

  ngOnInit() {
  }
}
