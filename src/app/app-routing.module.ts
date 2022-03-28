import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from "./components/signup/signup.component";
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { ChatroomComponent } from "./components/chatroom/chatroom.component";
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './auth-guard.service';
// import { SignupComponent } from "./components/signup/signup.component";
// import { SignupComponent } from "./components/signup/signup.component";


const routes: Routes = [
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginFormComponent},
  {path: 'chat', component: ChatroomComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
