import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [{ path: '', component: AuthComponent, children: [{path : 'login', component : LoginComponent , pathMatch : "full" }, {path : 'forgotpassword', component : ForgotPasswordComponent , pathMatch : "full" }, {path : 'resetpassword', component : ResetPasswordComponent , pathMatch : "full" }, {path : 'signup', component : SignupComponent , pathMatch : "full" }]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
