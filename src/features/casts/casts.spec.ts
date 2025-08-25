import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Casts } from './casts';

describe('Casts', () => {
  let component: Casts;
  let fixture: ComponentFixture<Casts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Casts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Casts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
