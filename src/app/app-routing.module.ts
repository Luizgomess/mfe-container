import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { environment } from 'src/environments/environment';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard] },
  { path: 'configuration', loadChildren: () => import('./pages/configuration/configuration.module').then(m => m.ConfigurationModule), canActivate: [AuthGuard] },
  {
    path: 'external-companies',
    loadChildren: () => loadRemoteModule({
      type: 'module',
      remoteEntry: environment.production ? 'https://external-companies-git-master-luizgomess-projects.vercel.app/remoteEntry.js' : 'http://localhost:3001/remoteEntry.js',
      exposedModule: './Module',
    }).then(m => m.AppModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }