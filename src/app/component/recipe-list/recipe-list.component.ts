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

  recipes: any[] = [];
  loading: boolean = true;

  constructor(private spoonSer: SpoonacularService) { }

  ngOnInit(): void {
    this.showRecipes();

  }

  showRecipes() {
    this.loading = true;
    this.spoonSer.recipes.subscribe({
      next: (data: any) => {
        this.recipes = data;
        if (data && data.length > 0) {
          this.loading = false;
        }
      },
      error: (err: any) => {
        console.error('Error fetching recipes:', err);
        this.loading = false;
      }
    });
  }
}
