import { Routes } from '@angular/router';
import {RegisterComponent} from './component/register/register.component';
import {LoginComponent} from './component/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
