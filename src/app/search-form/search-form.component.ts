import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cities } from './cities';
import { DarkModeService } from '../DarkMode.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})

export class SearchFormComponent  implements OnInit {
  @Output() searchClicked: EventEmitter<void> = new EventEmitter<void>();
  resultSearch: string[] = [];
  cities: string[] = Cities;

  isDepartureModalOpen = false;
  isArrivalModalOpen = false;
  isPassangerModal=false;
  departCity: string = '';
  arrivalCity: string = '';
  notFound!:string;

  minDate: string = '';
  dateDepart!:string ;
  searchForm!:FormGroup;
  
  passangerCount:number=1;
  
  constructor(private formBuilder: FormBuilder,private router:Router,public darkModeService:DarkModeService) {}
  // functions to formGroup
  ngOnInit(): void {
    this.setDate()
    this.searchForm = this.formBuilder.group({
      departure: [this.departCity, [Validators.required]],
      arrival: [this.arrivalCity, [Validators.required]],
      dateDepart: [new Date().toISOString(), [Validators.required]],
      passangerCount: [1, [Validators.required, Validators.min(1), Validators.max(8)]],
    });
  }

  onSubmit() { 
    console.log("submitted recherche ");
    console.log(this.searchForm.value);
    if (this.searchForm.valid) {
      console.log(this.searchForm.value);
      const departCity = this.searchForm.value.departure;
      const arrivalCity = this.searchForm.value.arrival;
      const dateDepart = this.searchForm.value.dateDepart;
      const passengerCount = this.searchForm.value.passangerCount;
      this.searchClicked.emit()
      this.router.navigate(['/ticket'], {
        queryParams: {
          departure: departCity,
          arrival: arrivalCity,
          date: dateDepart,
          passengers: passengerCount
        }
      });
    } else {
      console.log("Form is invalid.");
    }
  }
  


  setDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    this.dateDepart = `${year}-${month}-${day}`;
    this.minDate=this.dateDepart;
  }
   
  //functions that control the openin and closing of modals
  openLanguageMenu() {}

  ControlDepartureModal() {
    this.isDepartureModalOpen = !this.isDepartureModalOpen;
  }


  ControlArrivalModal() {
    this.isArrivalModalOpen = !this.isArrivalModalOpen;
  }

 
  OpenPassangerModal(){
     this.isPassangerModal=true;
  }
   

  // functions that control the flow of data and binding 
  switchCity(){
    let x=this.departCity;
    this.departCity=this.arrivalCity;
    this.arrivalCity=x;
  }
  selectCity(city:string,x: number){
     if(x === 1){
        this.departCity=city;
        this.ControlDepartureModal()
        
     }
     else{
        this.arrivalCity=city
        this.ControlArrivalModal()
     }

  }
  findDestination(x: number): void {
    if (x === 1) {
      console.log("Called the departure");
      this.resultSearch = this.cities.filter(c => c.toLowerCase().includes(this.departCity.toLowerCase()));
      this.notFound = this.resultSearch.length === 0 ? "No city was found" : "";
    } else {
      console.log("Called the arrival");
      this.resultSearch = this.cities.filter(c => c.toLowerCase().includes(this.arrivalCity.toLowerCase()));
      this.notFound = this.resultSearch.length === 0 ? "No city was found" : "";
    }
  }
   // functiong of passanger input
   incrementNumber() {
    if(this.passangerCount <8){
      this.passangerCount=this.passangerCount+1;
      }
    
  }

  decrementNumber() {
    if(this.passangerCount >1){
    this.passangerCount=this.passangerCount-1;
    }
  }
  closePopover(){
    this.isPassangerModal=!this.isPassangerModal;
  }

}
