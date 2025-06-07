import { Component } from '@angular/core';
import { SpoonacularService } from '../../servies/spoonacular/spoonacular.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-for-search',
  imports: [CommonModule],
  templateUrl: './item-for-search.component.html',
  styleUrls: ['./item-for-search.component.scss']
})
export class ItemForSearchComponent {

  items: any[] = [];

  constructor(private spoonSer: SpoonacularService) { }
  itemShow: any[] = [];

  ngOnInit(): void {
  this.spoonSer.getRecipeStatic("pizza").subscribe((data: any) => {
    this.items = data.results;
  });
}

}



