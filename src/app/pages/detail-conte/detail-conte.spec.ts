import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailConte } from './detail-conte';

describe('DetailConte', () => {
  let component: DetailConte;
  let fixture: ComponentFixture<DetailConte>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailConte]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailConte);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
