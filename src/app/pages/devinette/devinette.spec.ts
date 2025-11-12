import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Devinette } from './devinette';

describe('Devinette', () => {
  let component: Devinette;
  let fixture: ComponentFixture<Devinette>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Devinette]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Devinette);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
