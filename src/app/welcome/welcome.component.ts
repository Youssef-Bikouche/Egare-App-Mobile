import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DarkModeService } from '../DarkMode.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  dark:boolean=false;

  constructor(private router: Router,public darkModeService: DarkModeService) { }
 
  ngOnInit() {
    
  }  

  goToRegister(): void {
    this.router.navigate(['/registration']); 
  }

  goToLogin(): void {
    this.router.navigate(['/identification']); 
  }

  goToRecherche(): void {
    this.router.navigate(['/tabs']);
  }

  toggleDarkMode(): void {
    console.log("ddzdzdzdzdzdzd");
    this.darkModeService.toggleDarkMode();
  }
}
