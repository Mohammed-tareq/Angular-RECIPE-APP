import { Component } from '@angular/core';
import { RouterLink,Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./share/header/header.component";
import { FooterComponent } from "./share/footer/footer.component";
import { BtnComponent } from "./share/btn/btn.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, BtnComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {


}
