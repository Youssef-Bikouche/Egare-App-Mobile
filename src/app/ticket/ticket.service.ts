import { Injectable } from '@angular/core';

import { ticketData } from "./ticketData";
import { Ticket } from './ticket.model';
@Injectable({ 
  providedIn: 'root'
})
export class TicketService {
  constructor() { }

   searchAvailableTickets(departure: string, arrival: string, date: string, passengers: number):Ticket[] {
    const availableTickets = ticketData.filter(ticket =>
      ticket.departureLocation === departure &&
      ticket.arrivalLocation === arrival &&
      ticket.departureDay === date
    
    );
    
    console.log(availableTickets.length)
    return availableTickets;
  }
  searchTicketByCompany(company:string):Ticket[]{
    const availableTickets = ticketData.filter(ticket => ticket.companyName === company)
    return availableTickets;
  }  

  filterTicketsByOption(option: string, departureDate: string, departureCity: string, arrivalCity: string): Ticket[] {
    let filteredTickets: Ticket[] = ticketData.filter(ticket => 
        ticket.departureDay === departureDate &&
        ticket.departureLocation === departureCity &&
        ticket.arrivalLocation === arrivalCity
    );

    switch (option) {
        case 'Le départ le plus tot':
            filteredTickets = filteredTickets.sort((a, b) => {
                const timeA = new Date(`2024-05-10 ${a.departureTime}`);
                const timeB = new Date(`2024-05-10 ${b.departureTime}`);
                return timeA.getTime() - timeB.getTime();
            });
            break;

        case 'Le départ le plus tard':
            filteredTickets = filteredTickets.sort((a, b) => {
                const timeA = new Date(`2024-05-10 ${a.departureTime}`);
                const timeB = new Date(`2024-05-10 ${b.departureTime}`);
                return timeB.getTime() - timeA.getTime();
            });
            break;

        case 'Le départ le plus cher':
            filteredTickets = filteredTickets.sort((a, b) => b.priceValue - a.priceValue);
            break;

        case 'Le départ le moins cher':
            filteredTickets = filteredTickets.sort((a, b) => a.priceValue - b.priceValue);
            break;

        case 'Le plus rapide':
            filteredTickets = filteredTickets.sort((a, b) => {
                const timeA = new Date(`2024-05-10 ${a.travelDuration}`);
                const timeB = new Date(`2024-05-10 ${b.travelDuration}`);
                return timeA.getTime() - timeB.getTime();
            });
            break;

        default:
            break;
    }

    return filteredTickets;
}



  generateRandomSeats(ticket: Ticket, passengers: number): void {
    // Check if selectedSeats array is already populated
    if (ticket.selectedSeats.length === 0) {
      const availableSeats: number[] = Array.from({ length: ticket.totalSeats }, (_, i) => i + 1)
        .filter(seat => !ticket.reservedSeats.includes(seat) && !ticket.selectedSeats.includes(seat));
  
      let selectedPairCount = 0;
      let i = 0;
  
      while (selectedPairCount < Math.floor(passengers / 2) && availableSeats.length > 1) {
        const seat = availableSeats[i];
        const nextSeat = availableSeats[i + 1];
  
        if (nextSeat && nextSeat - seat === 1) {
          ticket.selectedSeats.push(seat);
          ticket.selectedSeats.push(nextSeat);
          selectedPairCount++;
        }
  
        i += 2;
      }
  
      // If there are remaining passengers and available single seats, select them
      const remainingPassengers = passengers - (selectedPairCount * 2);
      if (remainingPassengers > 0 && availableSeats.length > 0) {
        for (let j = 0; j < remainingPassengers && j < availableSeats.length; j++) {
          ticket.selectedSeats.push(availableSeats[j]);
        }
      }
  
      // Update the seat icons after assigning seats
      ticket.selectedSeats.forEach(seat => this.getSeatIcon(ticket, seat));
    }
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
  }
