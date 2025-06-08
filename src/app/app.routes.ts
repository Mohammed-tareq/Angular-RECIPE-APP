import { LoginComponent } from './component/login/login.component';
import { RecipeSearchComponent } from './component/recipe-search/recipe-search.component';
import { RegisterComponent } from './component/register/register.component';
import { MainComponent } from './pages/home/main/main.component';
import { Routes } from '@angular/router';
import { AuthGuard } from './Gurad/auth.guard'

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: MainComponent },
    { path: 'recipe-search', component: RecipeSearchComponent },
    { path: 'Recipes', loadComponent: () => import('./component/recipe-list/recipe-list.component').then(m => m.RecipeListComponent) },
    { path: '**', redirectTo: 'login' },
];
