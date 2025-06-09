import { Component } from '@angular/core';
import { SpoonacularService } from '../../servies/spoonacular/spoonacular.service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { LoaderComponent } from "../loader/loader.component";
import { CommonModule } from '@angular/common';

// Define interfaces for type safety
interface Nutrient {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
}

interface Nutrition {
  nutrients: Nutrient[];
  caloricBreakdown: {
    percentCarbs: number;
    percentFat: number;
    percentProtein: number;
  };
}

interface Credits {
  image: string;
  imageLink?: string;
  text?: string;
  link?: string;
}

interface Product {
  id: number;
  title: string;
  image: string;
  description?: string;
  price?: number;
  brand?: string;
  badges?: string[];
  nutrition?: Nutrition;
  credits?: Credits;
}

@Component({
  selector: 'app-single-item',
  standalone: true,
  imports: [RouterModule, LoaderComponent, CommonModule],
  templateUrl: './single-item.component.html',
  styleUrl: './single-item.component.scss'
})
export class SingleItemComponent {
  id: number;
  isLoader: boolean = true;
  recipe: Product | null = null;
  error: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private spoonSer: SpoonacularService
  ) {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? Number(idParam) : 0;
    if (!this.id) {
      this.error = 'Invalid product ID';
      this.isLoader = false;
    }
  }

  ngOnInit() {
    if (this.id) {
      this.getRecipeDetails();
    }
  }

  getRecipeDetails() {
    this.spoonSer.getRecipeDetails(this.id).subscribe({
      next: (data: Product) => {
        if (data) {
          this.recipe = data;
        } else {
          this.error = 'Product not found';
        }
        this.isLoader = false;
      },
      error: (err: any) => {
        console.error('Error fetching product details:', err);
        this.error = 'Failed to load product details';
        this.isLoader = false;
      }
    });
  }

  // Helper method to format badge text
  formatBadgeText(badge: string): string {
    return badge?.replace(/_/g, ' ').toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ') || '';
  }

  // Navigation method
  goHome(): void {
    this.router.navigate(['/']);
  }
}
