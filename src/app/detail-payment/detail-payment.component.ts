import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { ticketData } from '../ticket/ticketData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-payment',
  templateUrl: './detail-payment.component.html',
  styleUrls: ['./detail-payment.component.scss'],
})
export class DetailPaymentComponent implements OnInit {
  ticketDetails: any; // Define the type based on the structure of paymentDetails
  price: number | undefined;
  email: string | undefined;
  identifiant!:string;
  constructor(private router:Router) { }

  ngOnInit() {
    const paymentDetails: any = history.state;
    console.log('Payment Details:', paymentDetails);

    if (paymentDetails && paymentDetails.ticket && paymentDetails.price && paymentDetails.email) {
      this.ticketDetails = paymentDetails.ticket;
      this.price = paymentDetails.price;
      this.email = paymentDetails.email;
      console.log('Ticket Details:', this.ticketDetails);
      console.log('Price:', this.price);
      console.log('Email:', this.email);
      this.identifiant=uuidv4().replace(/-/g, '')
    } else {
      console.error('Payment details, ticket object, price, or email not found.');
    }
  }

  confirmPayment() {
    // Assuming this.ticketDetails.selectedSeats contains the selected seats
    // and ticketData is the array containing ticket information
  
    // Iterate through selected seats
    this.ticketDetails.selectedSeats.forEach((seat: number) => {
      // Find the corresponding ticket in the ticketData array
      const ticketIndex = ticketData.findIndex(ticket => ticket.title === this.ticketDetails.title);
  
      // If ticket is found, update its reservedSeats array
      if (ticketIndex !== -1) {
        // Push the selected seat into the reservedSeats array of the ticket
        ticketData[ticketIndex].reservedSeats.push(seat);
      }
    });
  
    // Clear selectedSeats array after reservation
    this.ticketDetails.selectedSeats = [];
  
    // Navigate to a confirmation page or any other route after reservation
    this.router.navigate(['/']); // Adjust the route according to your application
  }
  
}

