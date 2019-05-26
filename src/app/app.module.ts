import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatioSimplesComponent } from './patio-simples/patio-simples.component';
import { EngineComponent } from './engine/engine.component';

@NgModule({
  declarations: [
    AppComponent,
    PatioSimplesComponent,
    EngineComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
