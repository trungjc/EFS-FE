import { Component, OnInit, EventEmitter, Output } from '@angular/core';
declare var $: any
@Component({
  selector: 'app-home-index',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [], 
})
export class HomeComponent implements OnInit {
  constructor(
  ) { 
  }
  ngOnInit() {  
    $('.multiple-items').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3
    });
    $('.constant-slider').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1
    });
    
  }  
}
