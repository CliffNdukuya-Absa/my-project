import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subject-content',
  templateUrl: './subject-content.component.html',
  styleUrls: ['./subject-content.component.scss']
})
export class SubjectContentComponent implements OnInit {
  subjectName: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subjectName = this.route.snapshot.paramMap.get('name') ?? '';
  }
}
