import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VraiFauxQuiz } from './vrai-faux-quiz';

describe('VraiFauxQuiz', () => {
  let component: VraiFauxQuiz;
  let fixture: ComponentFixture<VraiFauxQuiz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VraiFauxQuiz]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VraiFauxQuiz);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
