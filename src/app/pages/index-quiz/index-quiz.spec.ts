import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexQuiz } from './index-quiz';

describe('IndexQuiz', () => {
  let component: IndexQuiz;
  let fixture: ComponentFixture<IndexQuiz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexQuiz]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexQuiz);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
