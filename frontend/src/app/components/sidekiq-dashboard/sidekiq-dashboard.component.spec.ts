import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidekiqDashboardComponent } from './sidekiq-dashboard.component';

describe('SidekiqDashboardComponent', () => {
  let component: SidekiqDashboardComponent;
  let fixture: ComponentFixture<SidekiqDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidekiqDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidekiqDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
