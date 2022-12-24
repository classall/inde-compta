import {Component} from '@angular/core';
import {appSettings} from '../config';
import {Transaction} from './models/transaction';
import {SoldeChartData} from './models/solde-chart-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  transactions: Transaction[] = [];
  soldes: SoldeChartData[] = [];
  CA_HT: number;
  TVA: number;
  benef: number;
  URSSAF: number;

  constructor() {
    this.CA_HT = 0;
    this.TVA = 0;
    this.benef = 0;
    this.URSSAF = 0;
  }

  onFileUpload(target: EventTarget | null) {
    if (target) {
      const files = (target as HTMLInputElement).files as FileList;
      this.readFile(files[0]);
    }
  }

  onFileDropped($event: FileList) {
    this.readFile($event[0]);
  }

  readFile(file: File): void {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const text = reader.result as string;
      this.csvToJSON(text);
    };
  }

  csvToJSON(csvText: string) {
    this.CA_HT = 0;
    this.TVA = 0;
    this.benef = 0;
    this.URSSAF = 0;
    const lines = csvText.replace(/\r/gm, '').split("\n");
    const result = [];
    const headers = lines[0].split(appSettings.csvSeparator);

    for (let i = 1; i < lines.length - 1; i++) {
      const obj: any = {};
      const currentline = lines[i].split(appSettings.csvSeparator);

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      const tr: Transaction = {
        date: this.convertToDate(obj['Date']),
        label: obj['Libellé'],
        amount: this.convertToNumber(obj['Solde mouvement']),
        credit: this.convertToNumber(obj['Crédit']),
        debit: this.convertToNumber(obj['Débit']),
        TVA: this.convertToNumber(obj['Montant de TVA total']),
        solde: this.convertToNumber(obj['Solde bancaire'])
      };

      if (!isNaN(tr.credit) && tr.credit > 0) {
        tr.credit_ht = tr.credit - tr.TVA;
        this.CA_HT += tr.credit_ht;
      }

      this.TVA += tr.TVA;
      this.benef += tr.amount;
      result.push(tr);
    }
    this.URSSAF = Math.round(this.CA_HT * appSettings.URSSAF);
    this.transactions = result;
    this.soldes = result.map(res => ({
      date: res.date,
      value: res.solde
    }));
  }

  convertToNumber(data: string): number {
    return Number(data.replace(',', '.'));
  }

  convertToDate(date: string): Date {
    const [day, month, year] = date.split('/');
    return new Date(+year, +month - 1, +day);
  }
}
