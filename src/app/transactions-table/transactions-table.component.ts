import {Component, Input} from '@angular/core';
import {Transaction} from '../models/transaction';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss']
})
export class TransactionsTableComponent {

  @Input() transactions: Transaction[] = [];
  displayedColumns: string[] = ['date', 'label', 'amount', 'TVA'];

}
