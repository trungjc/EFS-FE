import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routing } from './home-page.routing';
import { HomePageComponent } from './home-page.component';
import { HomeComponent } from './home/home.component';
@NgModule({
  imports: [
    CommonModule, 
    routing, 
    FormsModule,
  ],
  declarations: [    
    HomePageComponent,    
    HomeComponent,    
  ], 
})
export class HomePageModule { }
