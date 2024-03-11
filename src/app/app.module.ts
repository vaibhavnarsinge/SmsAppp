import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule} from '@angular/forms';
import { FormsModule} from '@angular/forms';

import { QuickSmsComponent } from './quick-sms/quick-sms.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MisReportComponent } from './mis-report/mis-report.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    QuickSmsComponent,
    DashboardComponent,
    MisReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
