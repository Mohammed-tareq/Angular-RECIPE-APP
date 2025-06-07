import { Component, OnInit } from '@angular/core';
import { SpoonacularService } from '../../servies/spoonacular/spoonacular.service';
import {  Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ItemForSearchComponent } from "../item-for-search/item-for-search.component";

@Component({
  selector: 'app-recipe-search',
  imports: [FormsModule, ItemForSearchComponent],
  templateUrl: './recipe-search.component.html',
  styleUrl: './recipe-search.component.scss'
})
export class RecipeSearchComponent   {

  query: string = '';

constructor(
  private spoonSer: SpoonacularService,
  private route: Router
) { }

searchRecipes() {
  if (!this.query.trim()  && !this.query) {
    return;
  }
  this.spoonSer.searchRecipes(this.query)
  this.route.navigate(['/Recipes']);
}
}
