import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './pipes/filter/filter.pipe';
import { HeaderComponent } from './components/header/header.component';
import { ProjectComponent } from './components/project/project.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    FilterPipe,
    HeaderComponent,
    ProjectComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FilterPipe,
    HeaderComponent,
    ProjectComponent,
  ]
})
export class SharedModule { }
