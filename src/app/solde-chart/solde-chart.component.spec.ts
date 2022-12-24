import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldeChartComponent } from './solde-chart.component';

describe('SoldeChartComponent', () => {
  let component: SoldeChartComponent;
  let fixture: ComponentFixture<SoldeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoldeChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoldeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
