import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {userData} from './ticket/Users';
import { User } from './ticket/User.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInKey = 'isLoggedIn';
  private loggedInSubject: BehaviorSubject<boolean>; 
  
  constructor() {
    // Initialize the BehaviorSubject with the current authentication state
    this.loggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  }

  login(credentials: { email: string, password: string }): boolean {
    const user: User | undefined = userData.find(u => u.email === credentials.email && u.password === credentials.password);
    if (user) {
        // Login successful
        localStorage.setItem(this.isLoggedInKey, 'true');
        localStorage.setItem("userInfo",JSON.stringify(user))
        this.loggedInSubject.next(true); // Notify subscribers that the user has logged in
        return true;
    } else {
        // Login failed
        return false;
    }
}

  logout(): void {
    console.log("hh")

    localStorage.removeItem(this.isLoggedInKey);
    this.loggedInSubject.next(false); 
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.isLoggedInKey) === 'true';
  }

  // Expose the authentication state as an observable
  isAuthenticatedObservable(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }
}
