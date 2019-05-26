import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatioSimplesComponent } from './patio-simples/patio-simples.component';
import { EngineComponent } from './engine/engine.component';

const routes: Routes = [

  { path: 'patio', pathMatch: 'full', component: PatioSimplesComponent  },
  { path: 'ex', pathMatch: 'full', component: EngineComponent  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
