import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  displayedColumns: string[] = ['date', 'label', 'amount', 'TVA'];
  dataSource: { date: string, label: string, amount: number }[] = [];
  CA_HT = 0;
  CA_TTC = 0;
  TVA = 0;
  benef = 0;
  URSSAF = 0;

  onFileUpload(event: any) {
    const reader = new FileReader();
    reader.readAsText(event.target.files[0]);
    reader.onload = () => {
      const text = reader.result as string;
      this.csvToJSON(text);
    };
  }

  csvToJSON(csvText: string) {
    const lines = csvText.replace(/\r/gm, '').split("\n");
    const result = [];
    const headers = lines[0].split(";");

    for (let i = 1; i < lines.length - 1; i++) {
      const obj: any = {};
      const currentline = lines[i].split(";");

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      const tr: any = {
        date: obj['Date'],
        label: obj['Libellé'],
        amount: Number(obj['Solde mouvement'].replace(',', '.')),
        credit: Number(obj['Crédit'].replace(',', '.')),
        debit: Number(obj['Débit'].replace(',', '.')),
        TVA: Number(obj['Montant de TVA total'].replace(',', '.'))
      };

      if (!isNaN(tr.credit)) {
        tr.credit_ht = tr.credit / 1.2;
      }

      result.push(tr);
      this.CA_HT += tr.credit_ht;
      this.CA_TTC += tr.credit;
      this.TVA += tr.TVA;
      this.benef += tr.amount;
    }
    this.URSSAF = Math.round(this.CA_HT * 0.222);
    this.dataSource = result;
  }
}
