import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatioSimplesComponent } from './patio-simples/patio-simples.component';

const routes: Routes = [

  { path: 'patio', pathMatch: 'full', component: PatioSimplesComponent  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
