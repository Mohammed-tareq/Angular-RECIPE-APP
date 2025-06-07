import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../servies/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {
    if (this.auth.isAuthenticated()) {
    this.router.navigate(['/home']);
  }
  }

  login() {
    try {
      this.auth.login({ email: this.email, password: this.password });
      this.router.navigate(['/home']);
    } catch (e: any) {
      this.error = e.message;
    }
  }
}
