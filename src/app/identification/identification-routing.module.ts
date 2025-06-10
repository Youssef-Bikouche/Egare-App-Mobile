import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdentificationComponent } from './identification.component';


// necessary for component to show up remember that
const routes: Routes = [
  {
    path: '',
    component: IdentificationComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class identificationPageRoutingModule {}
