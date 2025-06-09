import { Component } from '@angular/core';
import { SpoonacularService } from '../../servies/spoonacular/spoonacular.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-for-search',
  imports: [CommonModule ],
  templateUrl: './item-for-search.component.html',
  styleUrls: ['./item-for-search.component.scss']
})
export class ItemForSearchComponent {

  items: any[] = [];
  // itemShow: any[] = [];

  constructor(private spoonSer: SpoonacularService , private route: Router) { }

  ngOnInit(): void {
  this.spoonSer.getRecipeStatic("pizza").subscribe({
    next: (data: any) => {
      this.items = data.results;
      // this.itemShow = this.items.slice(0, 3); // Show only the first 10 items
    },
    error: (error: any) => {
      this.route.navigate(['/404']);
      console.error('Error fetching recipes:', error);
    }
  });
}

}



