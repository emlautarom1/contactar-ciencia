import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { ParticipateComponent } from './component/participate/participate.component';
import { ProfileComponent } from './component/profile/profile.component';
import { SearchComponent } from './component/search/search.component';
import { SettingsComponent } from './component/settings/settings.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { IsLoggedInGuard } from './guard/is-logged-in.guard';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "search",
    component: SearchComponent
  },
  {
    path: "profile/:id",
    component: ProfileComponent
  },
  {
    path: "participate",
    component: ParticipateComponent
  },
  {
    path: "signup",
    component: SignUpComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "settings",
    component: SettingsComponent,
    canActivate: [IsLoggedInGuard]
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
