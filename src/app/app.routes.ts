import { Routes } from '@angular/router';
import { RecipeSearchComponent } from './component/recipe-search/recipe-search.component';
import { MainComponent } from './pages/home/main/main.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full' },
    {path:'home', component: MainComponent },
    {path: 'recipe-search', component: RecipeSearchComponent },
    {path: 'Recipes', loadComponent: () => import('./component/recipe-list/recipe-list.component').then(m => m.RecipeListComponent) },
];
