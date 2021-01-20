import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
import { UserModule } from './user/user.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginComponent } from './user/login/login.component';
import { ExpensesService } from './expenses.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from '../app/profile/profile.component';
import { SocketService } from '../app/socket.service';

@NgModule({
  declarations: [
    AppComponent
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    UserModule,
    FormsModule,
    DashboardModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
      { path: '', redirectTo: 'login', pathMatch: 'full' },  
      { path: 'profile', component: ProfileComponent },
      { path: '*', component: LoginComponent },
      { path: '**', component: LoginComponent }
    ])
  ],
  providers: [ExpensesService,SocketService],
  bootstrap: [AppComponent]
})

export class AppModule { }
