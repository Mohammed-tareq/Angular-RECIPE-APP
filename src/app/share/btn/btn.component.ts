import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-btn',
  imports: [],
  templateUrl: './btn.component.html',
  styleUrl: './btn.component.scss'
})
export class BtnComponent {
  constructor(private router: Router) { }





  goToContact() {
    this.router.navigate(['/contact']);

  }


}
