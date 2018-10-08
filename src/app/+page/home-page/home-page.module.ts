import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routing } from './home-page.routing';
import { HomePageComponent } from './home-page.component';
import { HomeComponent } from './home/home.component';
import { EfsTVComponent } from './efs-tv/efs-tv.component';
import { StoryComponent } from './story/story.component';
import { ShopCategoryComponent } from './shop-category/shop-category.component';
import { ShopDetailComponent } from './shop-detail/shop-detail.component';
@NgModule({
  imports: [
    CommonModule, 
    routing, 
    FormsModule,
  ],
  declarations: [    
    HomePageComponent,    
    HomeComponent,   
    EfsTVComponent,
    StoryComponent,
    ShopCategoryComponent,
    ShopDetailComponent
  ], 
})
export class HomePageModule { }
