import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../servies/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/home']);
    } 

  }

  register() {
    if (!this.name || !this.email || !this.password) {
      this.error = 'Please fill in all required fields.';
      return;
    }
    try {
      this.auth.register({ name: this.name, email: this.email, password: this.password });
      this.router.navigate(['/home']);
    } catch (e: any) {
      this.error = e.message || 'Registration failed. Please try again.';}
  }
}
