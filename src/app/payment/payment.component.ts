import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from '../ticket/ticket.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  
  isTicketTrajectory: boolean = false;
  ticket!: Ticket;
  passengersCount!: number;
  formattedDate!: Date;
  contactForm!: FormGroup;
  selectedPaymentMethod: string = "";
  errorEmail: boolean = false;
  errorPhone: boolean = false;
  acceptPromotionalOffers: boolean = false;
  acceptTermsAndConditions: boolean = false;
  isErrorMessage: boolean = false;
  errorMessage: string = "";

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      telephone: ["", [Validators.required, Validators.pattern(/^\d{8}$/)]]
    });
  }

  ngOnInit() {
    const { ticketData, passengers } = history.state;
    console.log('Ticket data:', ticketData);
    console.log('Passengers:', passengers);
    this.ticket = ticketData;
    this.passengersCount = passengers;
    this.formattedDate = new Date();
  }

  selectPaymentMethod(paymentMethod: string) {
    this.selectedPaymentMethod = paymentMethod;
    console.log(paymentMethod);
  }

  buyTickets() {
    console.log(this.contactForm.value);
    console.log(this.selectedPaymentMethod);

    if (!this.contactForm.valid) {
      this.handleFormErrors();
      return;
    }

    if (!this.selectedPaymentMethod) {
      this.showErrorMessage("Please select a payment method");
      return;
    }

    if (!this.acceptTermsAndConditions) {
      this.showErrorMessage("Please accept the terms & conditions");
      return;
    }

    console.log('Form submitted successfully');
    console.log('TERMS ACCEPTED');

    // Redirection to a confirmation page with the object
    const paymentDetails = {
      ticket: {
        title: this.ticket.title,
        priceLabel: this.ticket.priceLabel,
        priceValue: this.ticket.priceValue,
        departureTime: this.ticket.departureTime,
        departureLocation: this.ticket.departureLocation,
        departureDay: this.ticket.departureDay,
        travelDuration: this.ticket.travelDuration,
        arrivalTime: this.ticket.arrivalTime,
        arrivalLocation: this.ticket.arrivalLocation,
        companyName: this.ticket.companyName,
        companyLogoSrc: this.ticket.companyLogoSrc,
        comfortLabel: this.ticket.comfortLabel,
        ticketNumberSrc: this.ticket.ticketNumberSrc,
        expanded: this.ticket.expanded,
        totalSeats: this.ticket.totalSeats,
        reservedSeats: this.ticket.reservedSeats,
        selectedSeats: this.ticket.selectedSeats,
        isTicketOpen: this.ticket.isTicketOpen
      },
      price: this.passengersCount * this.ticket.priceValue,
      email: this.contactForm.get("email")?.value
    };
    console.log('Payment Details:', paymentDetails);
  console.log("Ticket Title:", paymentDetails.ticket);
    this.router.navigate(['/PaymentDetails'], { state: paymentDetails });
  }

  private handleFormErrors() {
    if (this.contactForm.controls['telephone'].invalid) {
      this.errorPhone = true;
    }
    if (this.contactForm.controls['email'].invalid) {
      this.errorEmail = true;
    }
    this.showErrorMessage("Please fill the required fields");
  }

  private showErrorMessage(message: string) {
    this.errorMessage = message;
    this.isErrorMessage = true;
    setTimeout(() => {
      this.isErrorMessage = false;
    }, 2000);
  }

  goBackToTickets() {
    this.router.navigate(['ticket']);
  }

  toggleCrad() {
    this.isTicketTrajectory = !this.isTicketTrajectory;
    console.log(this.isTicketTrajectory);
  }
}
