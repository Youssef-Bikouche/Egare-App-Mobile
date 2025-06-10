import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailPaymentComponent } from './detail-payment.component';


// necessary for component to show up remember that
const routes: Routes = [
  {
    path: '',
    component: DetailPaymentComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class paymentDetailPageRoutingModule {}
