import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
            this.errorMessage = null;
      this.successMessage = null;
      console.log(this.loginForm.value);
      this.http.post<{ user: { name: string; surname: string; email: string }; token: string }>('/users/login', this.loginForm.value).subscribe({
        next: (res) => {
          localStorage.setItem('displayName', `${res.user.name} ${res.user.surname}`);
          localStorage.setItem('userEmail', res.user.email);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.errorMessage = err.error?.message ?? 'Login failed. Please try again.';
        }
        });
    }
  }
}
