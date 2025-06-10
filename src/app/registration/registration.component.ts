import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DarkModeService } from '../DarkMode.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  loginForm!: FormGroup;
  passwordVisible = false;
  errorMessage = '';
  isErrorMessage = false;

  constructor(private formBuilder: FormBuilder,public darkModeService: DarkModeService) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      prenom: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(([a-zA-Z][^:.*/}{;])*\d*)$'),
        ],
      ],
    });
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  verifyInputs(): void {
    if (this.loginForm.valid) {
      console.log('Form submitted successfully.');
      console.log(this.loginForm.value);
    } else {
      console.log('Form is invalid. Please check your inputs.');
      this.errorMessage = 'Please fill out all required fields correctly.';
      this.isErrorMessage = true;
      setTimeout(() => {
        this.isErrorMessage = false;
      }, 2000);
    }
  }
  
  toggleDarkMode(){
    this.darkModeService.toggleDarkMode();
  }
}
