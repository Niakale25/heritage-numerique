import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenusArtisanal } from './contenus-artisanal';

describe('ContenusArtisanal', () => {
  let component: ContenusArtisanal;
  let fixture: ComponentFixture<ContenusArtisanal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenusArtisanal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenusArtisanal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
