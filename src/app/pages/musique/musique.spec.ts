import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Musique } from './musique';

describe('Musique', () => {
  let component: Musique;
  let fixture: ComponentFixture<Musique>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Musique]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Musique);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
