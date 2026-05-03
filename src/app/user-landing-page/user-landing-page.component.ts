import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-landing-page',
  templateUrl: './user-landing-page.component.html',
  styleUrls: ['./user-landing-page.component.scss']
})
export class UserLandingPageComponent implements OnInit {
  displayName = localStorage.getItem('displayName') ?? 'Student';

  subjects = [
    { name: 'Mathematics',        icon: '&#10010;' },
    { name: 'Physical Sciences',  icon: '&#9883;' },
    { name: 'Life Sciences',      icon: '&#127807;' },
    { name: 'English',            icon: '&#128218;' },
    { name: 'History',            icon: '&#127981;' },
    { name: 'Geography',          icon: '&#127758;' },
    { name: 'Accounting',         icon: '&#128176;' },
    { name: 'Business Studies',   icon: '&#128188;' },
    { name: 'CAT',                icon: '&#128187;' },
    { name: 'Economics',          icon: '&#128200;' },
    { name: 'Agriculture',        icon: '&#127807;&#127806;' },
    { name: 'Music',              icon: '&#127925;' },
  ];

  selectedSubjects: Set<string> = new Set();
  activeSubject: string | null = null;
  hasSavedSubjects = false;
  showAddSubjects = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const email = localStorage.getItem('userEmail');
    const token = localStorage.getItem('token');
    if (!email || !token) return;
    const headers = { Authorization: `Bearer ${token}` };
    this.http.get<{ subjects: string[] }>('/users/subjectslist', { params: { email }, headers }).subscribe({
      next: (res) => {
        if (res.subjects && res.subjects.length > 0) {
          this.selectedSubjects = new Set(res.subjects);
          this.hasSavedSubjects = true;
        }
      },
      error: () => {
        // no saved subjects, user picks from scratch
      }
    });
  }

  toggleSubject(name: string): void {
    if (this.selectedSubjects.has(name)) {
      this.selectedSubjects.delete(name);
      if (this.activeSubject === name) this.activeSubject = null;
    } else {
      this.selectedSubjects.add(name);
    }
    const email = localStorage.getItem('userEmail');
    const token = localStorage.getItem('token');
    if (email && token) {
      const headers = { Authorization: `Bearer ${token}` };
      this.http.post('/users/subjects', { email, subjects: Array.from(this.selectedSubjects) }, { headers }).subscribe({
        next: () => {
          this.http.get<{ subjects: string[] }>('/users/subjectslist', { params: { email }, headers }).subscribe({
            next: (res) => {
              if (res.subjects && res.subjects.length > 0) {
                this.selectedSubjects = new Set(res.subjects);
                this.hasSavedSubjects = true;
              } else {
                this.hasSavedSubjects = false;
              }
            }
          });
        }
      });
    }
  }

  setActive(name: string): void {
    if (this.selectedSubjects.has(name)) {
      this.activeSubject = name;
      this.router.navigate(['/subject', name]);
    }
  }

  isSelected(name: string): boolean {
    return this.selectedSubjects.has(name);
  }
}

