import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayersinfoPage } from './playersinfo.page';

describe('PlayersinfoPage', () => {
  let component: PlayersinfoPage;
  let fixture: ComponentFixture<PlayersinfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
