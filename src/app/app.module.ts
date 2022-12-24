import {DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import localeFr from '@angular/common/locales/fr';
import {BrowserModule} from '@angular/platform-browser';
import {NgxEchartsModule} from 'ngx-echarts';
import {registerLocaleData} from '@angular/common';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';
import {TransactionsTableComponent} from './transactions-table/transactions-table.component';
import { SoldeChartComponent } from './solde-chart/solde-chart.component';
import { DropFileDirective } from './directives/drop-file.directive';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    TransactionsTableComponent,
    SoldeChartComponent,
    DropFileDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatCheckboxModule,
    MatTabsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    })
  ],
  providers: [
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR'},
    {provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
