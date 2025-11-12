import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProverbDetailsComponent } from './proverb-details-component';

describe('ProverbDetailsComponent', () => {
  let component: ProverbDetailsComponent;
  let fixture: ComponentFixture<ProverbDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProverbDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProverbDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
