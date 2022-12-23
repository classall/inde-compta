import {Component} from '@angular/core';
import {appSettings} from '../config';
import {Transaction} from './models/transaction';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  displayedColumns: string[] = ['date', 'label', 'amount', 'TVA'];
  dataSource: Transaction[] = [];
  CA_HT = 0;
  CA_TTC = 0;
  TVA = 0;
  benef = 0;
  URSSAF = 0;

  onFileUpload(event: Event) {
    const reader = new FileReader();
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    reader.readAsText(files[0]);
    reader.onload = () => {
      const text = reader.result as string;
      this.csvToJSON(text);
    };
  }

  csvToJSON(csvText: string) {
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
        date: obj['Date'],
        label: obj['Libellé'],
        amount: this.convertToNumber(obj['Solde mouvement']),
        credit: this.convertToNumber(obj['Crédit']),
        debit: this.convertToNumber(obj['Débit']),
        TVA: this.convertToNumber(obj['Montant de TVA total'])
      };

      if (!isNaN(tr.credit)) {
        tr.credit_ht = tr.credit / (1 + appSettings.TVA);
      }

      if (tr.credit_ht) {
        this.CA_HT += tr.credit_ht;
      }
      this.CA_TTC += tr.credit;
      this.TVA += tr.TVA;
      this.benef += tr.amount;
      result.push(tr);
    }
    this.URSSAF = Math.round(this.CA_HT * appSettings.URSSAF);
    this.dataSource = result;
  }

  convertToNumber(data: string) {
    return Number(data.replace(',', '.'));
  }
}
