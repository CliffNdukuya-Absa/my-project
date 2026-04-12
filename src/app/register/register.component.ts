import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      displayName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.errorMessage = null;
      this.successMessage = null;
      console.log(this.registerForm.value);
      this.http.post('/register', this.registerForm.value).subscribe({
        next: () => {
          this.successMessage = 'Registration successful!';
          this.registerForm.reset();
        },
        error: (err) => {
          this.errorMessage = err.error?.message ?? 'Registration failed. Please try again.';
        }
      });
    }
  }
}
