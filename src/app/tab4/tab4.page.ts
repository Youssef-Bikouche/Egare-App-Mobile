import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  passwordVisible: boolean = false;
  errorMessage: string = '';
  isLoggedInn: boolean = false;
  private authSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Subscribe to the authentication state
    this.authSubscription = this.authService.isAuthenticatedObservable().subscribe(isLoggedIn => {
      this.isLoggedInn = isLoggedIn;
    });

    // Initialize the login form
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the authentication state observable to prevent memory leaks
    this.authSubscription.unsubscribe();
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  login(): void {
    console.log("login clicked")
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      // Call the login method from the authentication service
      const { email, password } = this.loginForm.value;
      if (this.authService.login({ email, password })) {
        // Successful login
        console.log("Successful login");
      } else {
        // Failed login
        console.log("Invalid credentials");
      }
    } else {
      console.log("Invalid form");
    }
  }

}
