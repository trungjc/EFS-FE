import { ShareModuleModule } from './share-module/share-module.module';
import { HttpModule } from '@angular/http';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ServicesService } from './core/shared/services.service';
import { FunctionService } from './core/shared/function-services';

enableProdMode()
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ShareModuleModule,
    BrowserModule,
    AppRoutingModule, 
    CoreModule,
    HttpModule,
  ],
  providers: [ServicesService,FunctionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
