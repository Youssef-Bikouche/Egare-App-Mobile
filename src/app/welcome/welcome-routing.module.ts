import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome.component';
import { IdentificationComponent } from '../identification/identification.component';


// necessary for component to show up remember that
const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class welcomePageRoutingModule {}
