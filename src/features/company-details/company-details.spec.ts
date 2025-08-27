import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDetailsResponse } from './company-details';

describe('CompanyDetailsResponse', () => {
  let component: CompanyDetailsResponse;
  let fixture: ComponentFixture<CompanyDetailsResponse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyDetailsResponse]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CompanyDetailsResponse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
