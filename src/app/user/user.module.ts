import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'sign-up', component: SignupComponent },
      { path: 'forget-password', component: ForgetPasswordComponent },
      { path: 'update-password/:email', component: UpdatePasswordComponent },
      { path: 'dashboard', component: DashboardComponent }

    ])
  ],
  declarations: [LoginComponent, SignupComponent, ForgetPasswordComponent, UpdatePasswordComponent]
})
export class UserModule { }
