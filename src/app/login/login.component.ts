import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      usernameOrEmail: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
            this.errorMessage = null;
      this.successMessage = null;
      console.log(this.loginForm.value);
      this.http.post('/api/v1/auth/login', this.loginForm.value).subscribe({
        next: () => {
          this.successMessage = 'Login successful!';
          this.loginForm.reset();
        },
        error: (err) => {
          this.errorMessage = err.error?.message ?? 'Login failed. Please try again.';
        }
        });
    }
  }
}
