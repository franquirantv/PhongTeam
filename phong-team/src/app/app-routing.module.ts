import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { PrincipalComponent } from './pages/principal/principal.component';

const routes: Routes = [
  // Ruta de redirección para rutas no definidas

  // { path: '**', redirectTo: 'landing' },
  { path: 'landing', component: LandingComponent },
  { path: 'principal', component: PrincipalComponent },
  { path: '', redirectTo: 'landing', pathMatch: 'full' },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
