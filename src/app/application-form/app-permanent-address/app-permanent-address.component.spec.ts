import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPermanentAddressComponent } from './app-permanent-address.component';

describe('AppPermanentAddressComponent', () => {
  let component: AppPermanentAddressComponent;
  let fixture: ComponentFixture<AppPermanentAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppPermanentAddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppPermanentAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
