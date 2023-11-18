import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';

const routes: Routes = [
  // Ruta de redirección para rutas no definidas

  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  {
    title: 'Inicio',
    path: 'inicio',
    component: LandingComponent,
  },
  {
    // title: '',
    // path: '',
    // component: ,
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
