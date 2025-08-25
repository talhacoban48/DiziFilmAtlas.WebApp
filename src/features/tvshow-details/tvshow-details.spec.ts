import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvshowDetails } from './tvshow-details';

describe('TvshowDetails', () => {
  let component: TvshowDetails;
  let fixture: ComponentFixture<TvshowDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvshowDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvshowDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
