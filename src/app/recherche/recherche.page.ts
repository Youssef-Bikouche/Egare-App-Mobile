import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Cities } from './cities'; // Assuming 'Cities' is a valid import
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../ChangeLanguage.service';
import { DarkModeService } from '../DarkMode.service';
import { User } from '../ticket/User.model';
@Component({
  selector: 'app-recherche',
  templateUrl: 'recherche.page.html',
  styleUrls: ['recherche.page.scss'],
})
export class RecherchePage implements OnInit {

  resultSearch: string[] = [];
  cities: string[] = Cities;

  isDepartureModalOpen = false;
  isArrivalModalOpen = false;
  isPassangerModal=false;
  departCity: string = '';
  arrivalCity: string = '';
  notFound!:string;

  errorMessage: string = '';
  isErrorMessage: boolean = false;
  minDate: string = '';
  dateDepart!:string ;
  searchForm!:FormGroup;
  loggedIn:boolean=false;
  user!:User|undefined;
  passangerCount:number=1;
  isLoggedInn:boolean=false;
  translateSubscription: any;
  constructor(private formBuilder: FormBuilder,private router:Router,private authService: AuthService,private languageService:LanguageService,public darkmodeservice: DarkModeService) {}
  // functions to formGroup
  ngOnInit(): void {
     this.setDate()
    this.searchForm = this.formBuilder.group({
      departure: ['', [Validators.required]],
      arrival: ['', [Validators.required]],
      dateDepart: [new Date().toISOString(), [Validators.required]],
      passangerCount: [1, [Validators.required, Validators.min(1), Validators.max(8)]],
    });
    this.authService.isAuthenticatedObservable().subscribe((isLoggedIn: boolean) => {
      this.loggedIn = isLoggedIn; // Update loggedIn based on the authentication state
      if (isLoggedIn) {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
          this.user = JSON.parse(userInfo);
          console.log(this.user)
        } 
      } else {
        this.user = undefined; // Clear user info if the user is not logged in
      }
    });
  }

  onSubmit() { 
    if (this.searchForm.valid) {
      console.log(this.searchForm.value);
      const departCity = this.searchForm.value.departure;
      const arrivalCity = this.searchForm.value.arrival;
      const dateDepart = this.searchForm.value.dateDepart;
      const passengerCount = this.searchForm.value.passangerCount;
  
      this.router.navigate(['/ticket'], {
        queryParams: {
          departure: departCity,
          arrival: arrivalCity,
          date: dateDepart,
          passengers: passengerCount
        }
      });
    } else {
      console.log("Form is invalid");
      this.errorMessage = "please fill all the fields";
      this.isErrorMessage = true;
      setTimeout(() => {
        this.isErrorMessage = false;
      }, 2000)
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

  get isLoggedIn(): boolean {
    this.isLoggedInn=this.authService.isAuthenticated();
    return this.isLoggedIn;
  }

  languageChanged(event: any) {
    const selectedLanguage = event.detail.value;
    this.languageService.changeLanguage(selectedLanguage);
  }
}
