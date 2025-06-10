import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { DarkModeService } from '../DarkMode.service';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss'],
})
export class IdentificationComponent implements OnInit {
  loginForm!: FormGroup;
  passwordVisible: boolean = false;
  errorMessage: string = '';
  isErrorMessage: boolean = false;
  errorMessageTimeout: number = 2000;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public darkModeService: DarkModeService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(8)]],
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  async login() {
    if (this.loginForm.valid) {
      console.log('Form submitted successfully.');
      console.log(this.loginForm.value);

      const credentials = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };

      try {
        const isLoggedIn = await this.authService.login(credentials);
        if (isLoggedIn) {
          console.log('Login successful');
          this.router.navigate(['']); 
        } else {
          this.handleError('Email or password is invalid');
        }
      } catch (error) {
        console.error('Login error:', error);
        this.handleError('An error occurred during login');
      }
    } else {
      this.handleError('Email or password is invalid');
    }
  }

  private handleError(message: string) {
    this.errorMessage = message;
    this.isErrorMessage = true;
    setTimeout(() => {
      this.isErrorMessage = false;
    }, this.errorMessageTimeout);
  }

   toggleDarkMode(){
    this.darkModeService.toggleDarkMode();
  }
}
