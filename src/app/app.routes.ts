import { LoginComponent } from './component/login/login.component';
import { RecipeSearchComponent } from './component/recipe-search/recipe-search.component';
import { RegisterComponent } from './component/register/register.component';
import { MainComponent } from './pages/home/main/main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Gurad/auth.guard'

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {path:'home', component: MainComponent, canActivate: [AuthGuard] },
    {path: 'recipe-search', component: RecipeSearchComponent, canActivate: [AuthGuard] },
    {path: 'Recipes', loadComponent: () => import('./component/recipe-list/recipe-list.component').then(m => m.RecipeListComponent) },
    {path: '**', redirectTo: 'login'},
];
