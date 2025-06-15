import { Component } from '@angular/core';
import { SpoonacularService } from '../../servies/spoonacular/spoonacular.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-item-for-search',
  imports: [CommonModule, RouterModule],
  templateUrl: './item-for-search.component.html',
  styleUrls: ['./item-for-search.component.scss']
})
export class ItemForSearchComponent {

  items: any[] = [];
  foods: string[] = ["Sushi", "Burger", "Salad", "Sushi", "Tacos"];
  index: number = 0;
  currentFood!: string;


  constructor(private spoonSer: SpoonacularService, private route: Router) {}
    

  ngOnInit(): void {
    this.spoonSer.getRecipeStatic("salad").subscribe({
      next: (data: any) => {
        this.items = data.menuItems;
        // this.itemShow = this.items.slice(0, 3); // Show only the first 10 items
      },
      error: (error: any) => {
        this.route.navigate(['/404']);
        console.error('Error fetching recipes:', error);
      }
    });
  }

  

 

}



