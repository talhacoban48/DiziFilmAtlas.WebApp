import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverTvshows } from './discover-tvshows';

describe('DiscoverTvshows', () => {
  let component: DiscoverTvshows;
  let fixture: ComponentFixture<DiscoverTvshows>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscoverTvshows]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscoverTvshows);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
