
//import { WebsocketService } from './shared/socket.service';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';
import { AuthAdminGuard } from '../auth/shared/auth-admin.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { PageRoutingModule } from './page-routing.module';
import { PageComponent } from './page.component';
import { HomePageModule } from './home-page/home-page.module';

@NgModule({
  imports: [
    CommonModule,
    PageRoutingModule,
    FormsModule,
    CoreModule,
    HomePageModule,
  ],
  declarations: [
    PageComponent,
    HeaderComponent,
    FooterComponent,
  ],
  providers: [
    AuthAdminGuard
  ],  
})
export class PageModule { }
