import { Component, OnInit } from '@angular/core';
import { getSession } from '../../../../x/storage/storage';
import { AuthService } from '../../../auth/shared/auth.service';
declare var $: any
@Component({
  selector: 'app-admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [AuthService]
})
export class HeaderComponent implements OnInit {

  constructor(
    private authservice: AuthService
  ) { }
  user: any
  ngOnInit() {
    this.user = getSession('user')    
    console.log(this.user)
  }
  initDropdown() {
    $('.user-avatar').off('click').on('click', function () {
      if ($(this).hasClass('active-drop')) {
        $(this).removeClass('active-drop');
      }
      else {
        $(this).addClass('active-drop');
      }
    });
  }
  logout() {
    this.authservice.logout();
  }
}
