import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TicketComponent } from './ticket.component';
import { ticketPageRoutingModule } from './ticket-routing.module';
import { SearchFormComponent } from '../search-form/search-form.component';
import { SearchFormModule } from '../search-form/search-form.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ticketPageRoutingModule,
    ReactiveFormsModule,
    SearchFormModule,
    TranslateModule.forChild()
  ],
  declarations: [TicketComponent]
 
})
export class TicketModule { }
