// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//  logedIn!: boolean
 
//  login() {
//   this.logedIn = true;
//  }

//  logout() {
//   this.logedIn = false;
//  }

//  isLoggedIn(): boolean {
//   return this.logedIn;
//  }
// }


import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  register(user: { email: string; password: string }) {
    const users = this.getUsers();
    const exists = users.find(u => u.email === user.email);
    if (exists) throw new Error('User already exists');
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    this.saveToken(user.email);
  }

  login(credentials: { email: string; password: string }) {
    const users = this.getUsers();
    const valid = users.find(
      u => u.email === credentials.email && u.password === credentials.password
    );
    if (!valid) throw new Error('Invalid credentials');
    this.saveToken(valid.email);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  private getUsers(): { email: string; password: string }[] {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  getCurrentUser(): { email: string; password: string } | null {
  const email = localStorage.getItem('token');
  const users = this.getUsers();
  return users.find(u => u.email === email) || null;
  }
}