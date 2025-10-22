import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Conte } from './conte';

describe('Conte', () => {
  let component: Conte;
  let fixture: ComponentFixture<Conte>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Conte]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Conte);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
