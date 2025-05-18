import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualLessonsComponent } from './visual-lessons.component';

describe('VisualLessonsComponent', () => {
  let component: VisualLessonsComponent;
  let fixture: ComponentFixture<VisualLessonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualLessonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
