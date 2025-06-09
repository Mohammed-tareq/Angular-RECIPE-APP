import { Component, OnInit } from '@angular/core';
import { SpoonacularService } from '../../servies/spoonacular/spoonacular.service';
import { LoaderComponent } from '../loader/loader.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-list',
  imports: [CommonModule, LoaderComponent],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent implements OnInit {

<<<<<<< HEAD
  recipes: any[] = [];
=======
  recipes:any[] = [];
  loading = true;    
>>>>>>> 90f37f525fc97a76bc4113f0dd2947c32629e3be

  constructor(private spoonSer: SpoonacularService) { }

  ngOnInit(): void {
<<<<<<< HEAD
    this.showRecipes();

  }

  showRecipes() {
    this.spoonSer.recipes.subscribe({
      next: (data: any) => {
        this.recipes = data;
      },
      error: (err: any) => {
        console.error('Error fetching recipes:', err);
      }
    });

  }

=======
  this.loading = true;

  this.spoonSer.recipes.subscribe((data) => {
    if (data && data.length > 0) {
      this.recipes = data;
      this.loading = false;
    }
  });
}
>>>>>>> 90f37f525fc97a76bc4113f0dd2947c32629e3be
}
