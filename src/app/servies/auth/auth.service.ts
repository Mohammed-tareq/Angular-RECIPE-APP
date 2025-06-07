import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 logedIn!: boolean
 
 login() {
  this.logedIn = true;
 }

 logout() {
  this.logedIn = false;
 }

 isLoggedIn(): boolean {
  return this.logedIn;
 }
}
