import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectContentComponent } from './subject-content.component';

describe('SubjectContentComponent', () => {
  let component: SubjectContentComponent;
  let fixture: ComponentFixture<SubjectContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
