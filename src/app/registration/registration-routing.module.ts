import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration.component';


// necessary for component to show up remember that
const routes: Routes = [
  {
    path: '',
    component: RegistrationComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class registrationPageRoutingModule {}
