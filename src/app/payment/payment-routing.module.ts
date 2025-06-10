import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './payment.component';


// necessary for component to show up remember that
const routes: Routes = [
  {
    path: '',
    component: PaymentComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class paymentPageRoutingModule {}
