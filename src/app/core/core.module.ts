import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth/auth.service';
import { PortalService } from './services/portal/portal.service';
import { AuthGuard } from './guards/auth/auth.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    PortalService,
    AuthGuard
  ]
})
export class CoreModule { }
