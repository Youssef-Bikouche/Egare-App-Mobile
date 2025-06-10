import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecherchePage } from './recherche.page';


const routes: Routes = [
  {
    path: '',
    component: RecherchePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecherchePageRoutingModule {}
