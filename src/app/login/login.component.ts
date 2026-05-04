import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('bgAudio') bgAudio!: ElementRef<HTMLAudioElement>;
  audioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
  loginForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      const audio = this.bgAudio?.nativeElement;
      if (!audio) return;
      const fadeDuration = 3000;
      const interval = 50;
      const step = audio.volume / (fadeDuration / interval);
      const fade = setInterval(() => {
        if (audio.volume > step) {
          audio.volume = Math.max(0, audio.volume - step);
        } else {
          audio.volume = 0;
          audio.pause();
          clearInterval(fade);
        }
      }, interval);
    }, 5000);
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
