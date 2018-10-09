import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FunctionService } from '../../../core/shared/function-services';
declare var $: any
@Component({
  selector: 'app-home-index',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [FunctionService], 
})
export class HomeComponent implements OnInit {
  constructor(
    private comfunc:FunctionService
  ) { 
  }
  ngOnInit() {  
    this.comfunc.initPopupEffect()
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
  playVideo(){
    $('#modalVideo').modal('show')
  }
}
