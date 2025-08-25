import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastDetails } from './cast-details';

describe('CastDetails', () => {
  let component: CastDetails;
  let fixture: ComponentFixture<CastDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CastDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CastDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
