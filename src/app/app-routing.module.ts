import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuickSmsComponent } from './quick-sms/quick-sms.component';
import { HeaderComponent } from './header/header.component';
import { MisReportComponent } from './mis-report/mis-report.component';

const routes: Routes = [

  {
    path:'dashboard',
    component:DashboardComponent
  },
  {
    path:'',
    component:QuickSmsComponent
  },
  {
    path:'header',
    component:HeaderComponent
  },
  {
    path:'misreport',
    component:MisReportComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  
}
