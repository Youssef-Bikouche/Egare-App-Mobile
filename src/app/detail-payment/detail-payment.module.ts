import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailPaymentComponent } from './detail-payment.component';
import { paymentDetailPageRoutingModule } from './detail-payment-routing.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    paymentDetailPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule.forChild()
  ],
  declarations: [DetailPaymentComponent]
 
})
export class DetailPaymentModule { }
