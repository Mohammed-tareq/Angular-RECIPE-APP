import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



export class SpoonacularService {
  private apiKey: string = "eZnqJt0rO6R7yoCbo0O1gOktM33yzduj";
  private recipesSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  recipes: Observable<any[]> = this.recipesSubject.asObservable();

  constructor(private http: HttpClient) { }

  searchRecipes(query: string): void {
    const url = `https://api.apilayer.com/spoonacular/recipes/complexSearch?query=${query}`;
    const headers = new HttpHeaders().set('apiKey', this.apiKey);

    this.http.get(url, { headers }).subscribe((data: any) => {
      this.recipesSubject.next(data.results);
    });
  }

  getRecipeStatic(item: string): Observable<any[]> {
    const url = `https://api.apilayer.com/spoonacular/recipes/complexSearch?query=${item}`;
    const headers = new HttpHeaders().set('apiKey', this.apiKey);
    return this.http.get<any[]>(url, { headers });

  }
}
