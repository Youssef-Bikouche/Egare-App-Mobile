import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { DarkModeService } from './DarkMode.service';
import { LanguageService } from './ChangeLanguage.service';
import { User } from './ticket/User.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  isSidebarExpanded = true;

 
  dark = false;
  loggedIn = true;
  expanded = false;
  user: User | undefined;
  menuWidth: string = "337px"; // Initial size of the icon
  constructor(private authService: AuthService,private translate:TranslateService,private router:Router,public darkModeService: DarkModeService,private languageService:LanguageService) {
  }

  ngOnInit(): void {
    // Subscribe to the authentication state changes
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

  async setDarkMode() {
    this.darkModeService.toggleDarkMode();
  }

  logout() {
    this.authService.logout(); // Call the logout method from AuthService
  }

  onLanguageSelected(selectedLanguage: string) {
    console.log('Selected language:', selectedLanguage);
    this.translate.use(selectedLanguage);
  }
  isWelcomePage(): boolean {
    return this.router.url === '/welcome'; // Adjust this condition based on your route
  }
  isLoginPage(): boolean{
    return this.router.url === "/identification";
  }
  isRegisterPage(): boolean{
    return this.router.url === "/registration";
  }
  toggleExpanded(): void {
    this.expanded = !this.expanded;
  }
  

  toggleSidebar() {
    console.log(this.isSidebarExpanded)
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }
  languageChanged(event: any) {
    const selectedLanguage = event.detail.value;
    this.languageService.changeLanguage(selectedLanguage);
  }
  navigateToRechercheTab() {
    this.router.navigate(['/tabs/recherche']); // Navigate to the TabsPage and then to the recherche tab
  }

  navigateToTab2() {
    this.router.navigate(['/tabs/tab2']); // Navigate to the TabsPage and then to tab2
  }

  navigateToTab3() {
    this.router.navigate(['/tabs/tab3']); // Navigate to the TabsPage and then to tab3
  }
  navigateToTab4() {
    this.router.navigate(['/tabs/tab4']); // Navigate to the TabsPage and then to tab3
  }
navigateToLogin(){
  this.router.navigate(["/identification"])
}
}
