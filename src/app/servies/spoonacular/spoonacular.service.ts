import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



export class SpoonacularService {
  private apiKey: string = "0o7ScxshsAMw9fwNs4b5w5kaxjzlBaBA";
  private recipesSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  recipes: Observable<any[]> = this.recipesSubject.asObservable();

  constructor(private http: HttpClient) { }

  searchRecipes(query: string): void {
    const url = `https://api.apilayer.com/spoonacular/food/menuItems/search?query=${query}`;
    const headers = new HttpHeaders().set('apiKey', this.apiKey);

    this.http.get(url, { headers }).subscribe((data: any) => {
      this.recipesSubject.next(data.menuItems);
    });
  }

  getRecipeStatic(item: string): Observable<any[]> {
    const url = `https://api.apilayer.com/spoonacular/food/menuItems/search?query=${item}`;
    const headers = new HttpHeaders().set('apiKey', this.apiKey);
    return this.http.get<any[]>(url, { headers });

  }
  getRecipeDetails(id: number): Observable<any> {
    const url = `https://api.apilayer.com/spoonacular/food/menuItems/${id}`;
    const headers = new HttpHeaders().set('apiKey', this.apiKey);
    return this.http.get<any>(url, { headers });
  }
}
