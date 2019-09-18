import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricBallComponent } from './metric-ball.component';

describe('MetricBallComponent', () => {
  let component: MetricBallComponent;
  let fixture: ComponentFixture<MetricBallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetricBallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricBallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
