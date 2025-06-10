export interface Ticket {
    title: string;
    priceLabel: string;
    priceValue: number;
    departureTime: string;
    departureLocation: string;
    departureDay:string;
    travelDuration: string;
    arrivalTime: string;
    arrivalLocation: string;
    companyName: string;
    companyLogoSrc: string;
    comfortLabel: string;
    ticketNumberSrc: string;
    expanded: boolean;
    totalSeats: number; // Total number of seats available on the bus
    reservedSeats: number[]; // Array of seat numbers that are already reserved
    selectedSeats: number[];
    isTicketOpen:boolean
  }