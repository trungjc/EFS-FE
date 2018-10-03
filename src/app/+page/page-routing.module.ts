import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { AuthAdminGuard } from '../auth/shared/auth-admin.guard';
import { PageComponent } from './page.component';
export const children: Routes = [
  { path: '', pathMatch: "full", redirectTo: 'home' },  
  { path: 'home', loadChildren: ('./home-page/home-page.module#HomePageModule') },    

]
export const routes: Routes = [
  {
    path: '',
    component: PageComponent,
    children: children,
    //canActivate: [AuthAdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule { }
