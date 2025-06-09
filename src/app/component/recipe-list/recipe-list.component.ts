import { Component, OnInit } from '@angular/core';
import { SpoonacularService } from '../../servies/spoonacular/spoonacular.service';
import { LoaderComponent } from '../loader/loader.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  imports: [CommonModule, LoaderComponent , RouterModule],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent implements OnInit {

  recipes: any[] = [];
  loading: boolean = true;

  constructor(private spoonSer: SpoonacularService , private router: Router) { }

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
        this.router.navigate(['/404']);
        this.loading = false;
      }
    });
  }
}
