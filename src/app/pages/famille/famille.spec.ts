import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Famille } from './famille';

describe('Famille', () => {
  let component: Famille;
  let fixture: ComponentFixture<Famille>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Famille]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Famille);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
