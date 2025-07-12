import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tab1Page } from './tab1.page';
<<<<<<< HEAD
=======
import { DataService } from '../services/data.service';
>>>>>>> 8bdfca4c816053bf7872ae5feaa23a42cc458c84

describe('Tab1Page', () => {
  let component: Tab1Page;
  let fixture: ComponentFixture<Tab1Page>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(Tab1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
<<<<<<< HEAD

=======
  providers: [DataService];
 
>>>>>>> 8bdfca4c816053bf7872ae5feaa23a42cc458c84
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
