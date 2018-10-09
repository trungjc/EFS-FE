import { Component, OnInit } from '@angular/core';
import { getSession } from '../../../../x/storage/storage';
import { AuthService } from '../../../auth/shared/auth.service';
declare var $: any
@Component({
  selector: 'app-find-stock',
  templateUrl: './findStock.component.html',
  styleUrls: ['./findStock.component.scss'],
  providers: [AuthService]
})
export class FindStockComponent implements OnInit {
  stock:any
  constructor(
    private authservice: AuthService
  ) { }
  ngOnInit() {
    this.stock = 'search'
  }
  searchStock(){
    this.stock = 'result'
  }
}
