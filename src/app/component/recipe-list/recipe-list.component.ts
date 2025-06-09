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

  recipes:any[] = [];
  loading = true;    

  constructor(private spoonSer:SpoonacularService) { }

  ngOnInit(): void {
  this.loading = true;

  this.spoonSer.recipes.subscribe((data) => {
    if (data && data.length > 0) {
      this.recipes = data;
      this.loading = false;
    }
  });
}
}
