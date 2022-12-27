import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPyqComponent } from './view-pyq.component';

describe('ViewPyqComponent', () => {
  let component: ViewPyqComponent;
  let fixture: ComponentFixture<ViewPyqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPyqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPyqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
