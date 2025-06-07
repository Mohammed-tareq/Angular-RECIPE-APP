import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthService } from '../../../servies/auth/auth.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  constructor (private router: Router,public auth: AuthService ) { }

  navigateToRecipes() {
    this.router.navigate(['/recipe-search']);
  }

  logout() {
    this.auth.logout();
  }

}
