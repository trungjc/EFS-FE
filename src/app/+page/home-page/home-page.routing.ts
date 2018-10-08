import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomePageComponent } from './home-page.component';
import { EfsTVComponent } from './efs-tv/efs-tv.component';
import { StoryComponent } from './story/story.component';
import { ShopCategoryComponent } from './shop-category/shop-category.component';
import { ShopDetailComponent } from './shop-detail/shop-detail.component';
const children: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'index' },    
  { path: 'index', component: HomeComponent },    
  { path: 'EFSTV', component: EfsTVComponent },  
  { path: 'story', component: StoryComponent }, 
  { path: 'category', component: ShopCategoryComponent }, 
  { path: 'category-detail', component: ShopDetailComponent }, 
]



export const routing = RouterModule.forChild([
  {
    path: '',
    component: HomePageComponent,
    children: children
  }
]);