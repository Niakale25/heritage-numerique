import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutContenu } from './ajout-contenu';

describe('AjoutContenu', () => {
  let component: AjoutContenu;
  let fixture: ComponentFixture<AjoutContenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutContenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutContenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
