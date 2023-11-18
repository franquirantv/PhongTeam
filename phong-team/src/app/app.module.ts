import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './pages/landing/landing.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { NavbarComponent } from './commons/navbar/navbar.component';
import { LoadingSpinnerComponent } from './commons/loading-spinner/loading-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StoreModule } from '@ngrx/store';
import { SharedReducer } from './store/shared/shared.reducer';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    PrincipalComponent,
    NavbarComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    StoreModule.forRoot({ shared: SharedReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
