import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQuiz } from './list-quiz';

describe('ListQuiz', () => {
  let component: ListQuiz;
  let fixture: ComponentFixture<ListQuiz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListQuiz]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListQuiz);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
