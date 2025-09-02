import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverMovies } from './discover-movies';

describe('DiscoverMovies', () => {
  let component: DiscoverMovies;
  let fixture: ComponentFixture<DiscoverMovies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscoverMovies]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscoverMovies);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
