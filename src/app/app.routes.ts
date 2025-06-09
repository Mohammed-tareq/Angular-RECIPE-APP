import { LoginComponent } from './component/login/login.component';
import { RecipeSearchComponent } from './component/recipe-search/recipe-search.component';
import { RegisterComponent } from './component/register/register.component';
import { MainComponent } from './pages/home/main/main.component';
import { Routes } from '@angular/router';
import { AuthGuard } from './Gurad/auth.guard'
import { ContactComponent } from './component/contact/contact.component';
import { LoaderComponent } from './component/loader/loader.component';
import { ErrorComponent } from './component/error/error.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: MainComponent },
    { path: 'recipe-search', component: RecipeSearchComponent },
    { path: 'Recipes', loadComponent: () => import('./component/recipe-list/recipe-list.component').then(m => m.RecipeListComponent) },
    { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
    { path: 'loader', component:LoaderComponent },
    { path: 'Recipe/:id', loadComponent: () => import('./component/single-item/single-item.component').then(m => m.SingleItemComponent), canActivate: [AuthGuard] },
    { path: '404', component:ErrorComponent },
    { path: '**', redirectTo: '404' },


];
