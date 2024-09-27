import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'appointment', pathMatch: 'full' },
  { path: 'appointment', loadChildren: () => import('./appointment/appointment.module').then((m) => m.AppointmentModule) },
  { path: '**', redirectTo: 'appointment', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
