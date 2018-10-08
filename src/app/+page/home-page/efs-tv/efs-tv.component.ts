import { Component, OnInit, EventEmitter, Output } from '@angular/core';
declare var $: any
@Component({
  selector: 'app-home-EFSTV',
  templateUrl: './efs-tv.component.html',
  styleUrls: ['./efs-tv.component.scss'],
  providers: [], 
})
export class EfsTVComponent implements OnInit {
  constructor(
  ) { 
  }
  ngOnInit() { 
    $('.slide-video').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1
    }); 
  }  
}
