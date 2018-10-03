import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomePageComponent } from './home-page.component';
const children: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'index' },    
  { path: 'index', component: HomeComponent },    
]



export const routing = RouterModule.forChild([
  {
    path: '',
    component: HomePageComponent,
    children: children
  }
]);