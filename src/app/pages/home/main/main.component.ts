import { Component } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  constructor (private router: Router) { }

  navigateToRecipes() {
    this.router.navigate(['/recipe-search']);
  }

}
