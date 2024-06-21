import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment'

const routes: Routes = [
  {
    path: 'external-companies',
    loadChildren: () => loadRemoteModule({
      type: 'module',
      remoteEntry: environment.production ? 'https://external-companies-git-master-luizgomess-projects.vercel.app/remoteEntry.js' : 'http://localhost:3001/remoteEntry.js',
      exposedModule: './Module',
    }).then(m => m.AppModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
