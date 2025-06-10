import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome.component';
import { welcomePageRoutingModule } from './welcome-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    welcomePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [WelcomeComponent]
 
})
export class WelcomeModule { }
