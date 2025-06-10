import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration.component';
import { registrationPageRoutingModule } from './registration-routing.module';
import { TranslateModule } from '@ngx-translate/core';
// import { IdentificationComponent } from './identification.component';
// import { identificationPageRoutingModule } from './identification-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    registrationPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule.forChild()
  ],
  declarations: [RegistrationComponent]
 
})
export class RegistrationModule { }
