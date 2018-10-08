import { Component, OnInit, EventEmitter, Output } from '@angular/core';
declare var $: any
@Component({
  selector: 'app-shop-category',
  templateUrl: './shop-category.component.html',
  styleUrls: ['./shop-category.component.scss'],
  providers: [], 
})
export class ShopCategoryComponent implements OnInit {
  constructor(
  ) { 
  }
  ngOnInit() { 
    $('.slide-product').slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 4
    });
  }  
}
