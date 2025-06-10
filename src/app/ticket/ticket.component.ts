import { Component, OnInit } from '@angular/core';
import { transportationCompanies } from './transport';
import { trieOptions } from './trieOptions';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from './ticket.service';
import { Ticket } from './ticket.model';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent  implements OnInit {
   
   isTrieOpen:boolean=false;
   isFilterOpen:boolean=false;
   selectedTicket!:Ticket;
   companies:string[]=[];
   selectedCompanies:string[]=[];

   trie:string[]=[];

   tickets:Ticket[]=[];
// Initialize leftSeats and rightSeats arrays
   leftSeats: number[] = [];
   rightSeats: number[] = [];

    departure=""  
    arrival=""
    date=""
    passengers=1 
    formattedDate!:Date;

    isSearchForm:boolean=false;
    constructor(private router:Router,private activatedRoute:ActivatedRoute,private ticketService: TicketService,private modalController: ModalController) { }
    // fetching data from the recherche page 

    ngOnInit() {
      this.getTickets();
      this.companies=transportationCompanies;
      this.trie=trieOptions;
     
      for (let i = 1; i <= 48; i++) {
        if (i <= 2) {
          this.leftSeats.push(i);
        } else if (i <= 4) {
          this.rightSeats.push(i);
        } else if (i % 4 === 1 || i % 4 === 2) {
          this.leftSeats.push(i);
        } else {
          this.rightSeats.push(i);
        }
      }
      this.activatedRoute.queryParams.subscribe(params => {
        // Fetch tickets whenever queryParams change
        this.getTickets();
      });
      
    }
    getTickets() {
      this.activatedRoute.queryParams.subscribe(params => {
        this.departure = params['departure'];
        this.arrival = params['arrival'];
        this.date = params['date'];
        this.passengers = params['passengers']; 
        
        if (this.departure && this.arrival && this.date && this.passengers) {
          this.formattedDate = new Date(this.date);
          if (!isNaN(this.formattedDate.getTime())) {
            sessionStorage.setItem('tickets', JSON.stringify({
              departure: this.departure,
              arrival: this.arrival,
              date: this.date,
              passengers: this.passengers
            }));
            this.tickets = this.ticketService.searchAvailableTickets(this.departure, this.arrival, this.date, this.passengers);
          }
        } else {
          const ticketsInfos = sessionStorage.getItem('tickets');
          if (ticketsInfos != null) {
            const storedTickets = JSON.parse(ticketsInfos);
            this.departure = storedTickets.departure;
            this.arrival = storedTickets.arrival;
            this.date = storedTickets.date;
            this.passengers = storedTickets.passengers;
            this.formattedDate = new Date(this.date);
            if (!isNaN(this.formattedDate.getTime())) {
              this.tickets = this.ticketService.searchAvailableTickets(storedTickets.departure, storedTickets.arrival, storedTickets.date, storedTickets.passengers);
            } else {
              // to handle later idk how
            }
          }
        }
      });
    }
    
 
   filterModal(){
    console.log("filter modal triggered")
    this.isFilterOpen=!this.isFilterOpen;
  }

  trieModal(){
     console.log("trie modal triggered")
     this.isTrieOpen=!this.isTrieOpen;
  }

  CheckBoxCompany(company: string) {
    console.log("Selected company:", company);
    const index = this.selectedCompanies.indexOf(company);
    if (index === -1) {
      this.selectedCompanies.push(company);
    } else {
      this.selectedCompanies.splice(index, 1);
    }

    this.tickets=this.ticketService.searchTicketByCompany(company);
  
  }
  
  CheckBoxOption(option:string){
    console.log("option"+option);
    this.trieModal();
    this.tickets=this.ticketService.filterTicketsByOption(option,this.date,this.departure,this.arrival);
  }


  toggleTicket(ticket: any) {
    ticket.expanded = !ticket.expanded;
    this.selectedTicket = ticket; // Set the selected ticket
    ticket.isTicketOpen = !ticket.isTicketOpen;
    console.log(ticket.isTicketOpen)
    this.ticketService.generateRandomSeats(ticket, this.passengers)
    this.tickets.forEach(t => {
      if (t !== ticket) {
        t.expanded = false;
        t.isTicketOpen=false;
      }
    });

  }

  getSeatIcon(ticket: Ticket, seat: number): string {
    if (ticket.reservedSeats.includes(seat)) {
      return '../../assets/icon/living.svg'; // Non-available seat icon
    } else if (ticket.selectedSeats.includes(seat)) {
      return '../../assets/icon/living orange.svg'; // Orange seat icon for selected seats
    } else {
      return '../../assets/icon/living vert.svg'; // Available seat icon
    }
  }
  
   handleSeatClick(ticket: Ticket, seatNumber: number) {
    console.log('Seat clicked:', seatNumber);
    // Check if the seat is reserved
    if (ticket.reservedSeats.includes(seatNumber)) {
      console.log("Can't select it, seat is reserved");
      return; // Exit the function early if the seat is reserved
    }
    
    // Check if the maximum number of seats has been reached
    if (ticket.selectedSeats.length >= this.passengers) {
      console.log("You've already selected the maximum number of seats (8)");
          if( !ticket.selectedSeats.includes(seatNumber)){
            console.log(ticket.selectedSeats)
            ticket.selectedSeats.push(seatNumber);
            ticket.selectedSeats.splice(0,1);
            console.log(ticket.selectedSeats)
            this.ticketService.getSeatIcon(ticket,seatNumber)
          }
        
        return; // Exit the function early if the maximum number of seats has been reached
      }
    }

  acheter(ticket:Ticket):void{
    console.log(ticket);
    this.modalController.dismiss().then(() => {
      // After dismissing the modal, reset ticket properties and navigate
      this.tickets.forEach(t => {
        t.expanded = false;
        t.isTicketOpen = false;
      });
    });
      this.router.navigate(['/payment'], {
        state: { ticketData: ticket, passengers: this.passengers }
      });
  }

  goBackRecherche() {
    this.router.navigate(['rechercher']);
    // Dismiss the modal before navigating
    this.modalController.dismiss().then(() => {
      // After dismissing the modal, reset ticket properties and navigate
      this.tickets.forEach(t => {
        t.expanded = false;
        t.isTicketOpen = false;
      });
      this.router.navigate(['rechercher']);
    });
  }

  toggleSearchForm(){
     this.isSearchForm=!this.isSearchForm;
  }
  
}
