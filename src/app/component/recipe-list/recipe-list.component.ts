import { Component, OnInit } from '@angular/core';
import { SpoonacularService } from '../../servies/spoonacular/spoonacular.service';

@Component({
  selector: 'app-recipe-list',
  imports: [],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent implements OnInit {

  recipes: any[] = [];

  constructor(private spoonSer: SpoonacularService) { }

  ngOnInit(): void {
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

}
