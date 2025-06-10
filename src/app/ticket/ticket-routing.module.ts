import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketComponent } from './ticket.component';


// necessary for component to show up remember that
const routes: Routes = [
  {
    path: '',
    component: TicketComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ticketPageRoutingModule {}
