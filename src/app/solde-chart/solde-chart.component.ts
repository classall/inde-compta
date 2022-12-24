import {Component, Inject, Input, LOCALE_ID, OnChanges, SimpleChanges} from '@angular/core';
import {EChartsOption} from 'echarts';
import {SoldeChartData} from '../models/solde-chart-data';
import {formatCurrency, formatDate, getCurrencySymbol, getLocaleCurrencyCode} from '@angular/common';
import {CallbackDataParams, TopLevelFormatterParams} from 'echarts/types/dist/shared';

@Component({
  selector: 'app-solde-chart',
  templateUrl: './solde-chart.component.html',
  styleUrls: ['./solde-chart.component.scss']
})
export class SoldeChartComponent implements OnChanges {

  @Input() soldes: SoldeChartData[] = [];
  chartOption: EChartsOption | null = null;

  constructor(
    @Inject(LOCALE_ID) public locale: string
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['soldes']) {
      const data = changes['soldes'].currentValue;
      this.chartOption = {
        title: {
          text: 'Soldes'
        },
        tooltip: {
          trigger: 'axis',
          formatter: (params: TopLevelFormatterParams) => {
            const param = (params as CallbackDataParams[])[0];
            return formatDate(param.name, 'shortDate', this.locale) +
              ' : ' +
              formatCurrency(Number(param.value), this.locale, getCurrencySymbol(getLocaleCurrencyCode(this.locale) as string, 'narrow'));
          },
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          data: data.map((d: SoldeChartData) => d.date),
          axisLabel: {
            formatter: (params: string) => {
              return formatDate(params, 'shortDate', this.locale);
            }
          }
        },
        yAxis: {
          type: 'value'
        },
        series: {
          type: 'line',
          data: data.map((d: SoldeChartData) => d.value)
        }
      };
    }
  }

}
